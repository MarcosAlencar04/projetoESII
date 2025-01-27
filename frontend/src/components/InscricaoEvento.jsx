import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Inscricao.css";

const FormInscricao = () => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [eventActions, setEventActions] = useState([]);
  const [selectedAction, setSelectedAction] = useState("");
  const [events, setEvents] = useState([]);
  const [loggedUser, setLoggedUser] = useState(""); // Armazena o nome do usuário logado
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se o usuário está logado
    const usuarioNome = localStorage.getItem("usuarioNome");
    const usuarioId = localStorage.getItem("usuarioId");

    if (!usuarioNome || !usuarioId) {
      alert("Você precisa estar logado para acessar esta página.");
      navigate("/login"); // Redireciona para a página de login
      return;
    }

    setLoggedUser(usuarioNome); // Define o nome do usuário logado

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
  }, [navigate]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEvent || !selectedAction || !loggedUser) {
      alert("Por favor, selecione um evento e uma ação.");
      return;
    }

    const payload = {
      evento: selectedEvent,
      acao: selectedAction,
      usuario: loggedUser,
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
        setEventActions([]);
        navigate("/HomeLogged");
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
          <label htmlFor="usuario">Usuário</label>
          <input
            type="text"
            id="usuario"
            value={loggedUser}
            disabled
            className="readonly-field"
          />
        </div>

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
