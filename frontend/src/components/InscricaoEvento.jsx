import React, { useState, useEffect } from "react";
import "../css/Inscricao.css";

const FormInscricao = () => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [eventActions, setEventActions] = useState([]);
  const [selectedAction, setSelectedAction] = useState("");
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    cpf: "",
    email: "",
  });

  // Fetch de eventos do backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/events");
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
      const response = await fetch(`http://localhost:3000/events/${selectedId}/actions`);
      const data = await response.json();
      setEventActions(data);
    } catch (error) {
      console.error("Erro ao buscar ações:", error);
      setEventActions([]);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if ((id === "telefone" || id === "cpf") && isNaN(value)) return;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      eventoId: selectedEvent,
      acao: selectedAction,
    };

    try {
      const response = await fetch("http://localhost:3000/inscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Inscrição enviada com sucesso!");
        setFormData({
          nome: "",
          telefone: "",
          cpf: "",
          email: "",
        });
        setSelectedEvent("");
        setSelectedAction("");
        setEventActions([]);
      } else {
        alert("Erro ao enviar inscrição.");
      }
    } catch (error) {
      console.error("Erro ao enviar inscrição:", error);
    }
  };

  // Botão "Voltar" para retornar à página anterior
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="form-container">
      <h2>Inscrição no Evento</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            value={formData.nome}
            onChange={handleInputChange}
            placeholder="Digite seu nome"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone</label>
          <input
            type="text"
            id="telefone"
            value={formData.telefone}
            onChange={handleInputChange}
            placeholder="Digite seu telefone"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            value={formData.cpf}
            onChange={handleInputChange}
            placeholder="Digite seu CPF"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Digite seu email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="evento">Evento</label>
          <select id="evento" value={selectedEvent} onChange={handleEventChange} required>
            <option value="">Selecione um evento</option>
            {events.map((evento) => (
              <option key={evento.id} value={evento.id}>
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
                <option key={index} value={acao}>
                  {acao}
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
