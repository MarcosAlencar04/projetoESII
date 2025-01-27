import React, { useState, useEffect } from "react";
import "../css/Inscricao.css";

const FormInscricao = () => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [eventActions, setEventActions] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [events, setEvents] = useState([]);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8080/eventos/buscarEventos");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventChange = async (event) => {
    const selectedId = event.target.value;
    setSelectedEvent(selectedId);

    try {
      const response = await fetch(`http://localhost:8080/acoes/buscarPorEvento?nome=${selectedId}`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setEventActions(data);
      } else {
        setEventActions([]);
        console.error("Resposta inválida do servidor:", data);
      }
    } catch (error) {
      console.error("Erro ao buscar ações:", error);
      setEventActions([]);
    }
  };

  useEffect(() => {

    const usuarioId = localStorage.getItem("usuarioId");
    const isAdm = localStorage.getItem("usuarioIsAdm");
    const isResponsavel = localStorage.getItem("usuarioIsResponsavel");
    const statusConfirmado = localStorage.getItem("usuarioStatusConfirmado");

    if (!usuarioId || statusConfirmado !== "true") {
      alert("Você não está autorizado a acessar esta página. Por favor, faça login ou aguarde a confirmação do seu cadastro.");
      navigate("/");
      return;
    }

    if (isAdm !== "true" && isResponsavel !== "true") {
      alert("Você não tem permissão para cadastrar ações.");
      navigate("/HomeLogged");
      return;
    }
    
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/usuarios/buscarUsuarios");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedEvent || !selectedAction || !selectedUser) {
    alert("Por favor, selecione um evento, uma ação e um usuário.");
    return;
  }

  const payload = {
    evento: selectedEvent,
    acao: selectedAction,
    usuario: selectedUser,
    dataInscricao: formatDate(new Date()),
  };

  try {
    const response = await fetch("http://localhost:8080/inscricoes/realizarInscricao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert("Inscrição enviada com sucesso!");
      setSelectedEvent("");
      setSelectedAction("");
      setSelectedUser("");
      setEventActions([]);
      navigate("/")
    } else {
      const errorData = await response.json();
      alert(`Erro ao enviar inscrição: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Erro ao enviar inscrição:", error);
  }
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};


  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="form-container">
      <h2>Inscrição no Evento</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="evento">Evento</label>
          <select id="evento" value={selectedEvent} onChange={handleEventChange} required>
            <option value="">Selecione um evento</option>
            {events.map((evento) => (
              <option key={evento.id} value={evento.nome}>
                {evento.nome}
              </option>
            ))}
          </select>
        </div>

        {selectedEvent && (
          <div className="form-group">
            <label htmlFor="acao">Ação do Evento</label>
            <select
              id="acao"
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              required
            >
              <option value="">Selecione uma ação</option>
              {eventActions.map((acao, index) => (
                <option key={index} value={acao.titulo}>
                  {acao.titulo}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="usuario">Usuário</label>
          <select
            id="usuario"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
          >
            <option value="">Selecione um usuário</option>
            {users.map((usuario) => (
              <option key={usuario.id} value={usuario.nome}>
                {usuario.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="button-group">
          <button type="button" className="btn-back" onClick={handleBack}>
            Voltar
          </button>
          <button type="submit" className="btn-submit">
            Enviar Inscrição
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormInscricao;
