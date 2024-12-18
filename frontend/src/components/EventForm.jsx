import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/EventForm.css";

function EventForm() {
    const [formData, setFormData] = useState({
        nomeEvento: "",
        tipoEvento: "",
        localEvento: "",
        numeroVagas: "",
        valorInscricao: "",
        dataInicio: "",
        dataFim: "",
    });

    const navigate = useNavigate(); // Instância para navegação

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dados enviados:", formData);

        // Simula envio ao back-end
        fetch("/salvarContrato", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Resposta do servidor:", data);
                navigate("/"); // Redireciona para a página inicial após o envio
            })
            .catch((error) => {
                console.error("Erro ao enviar:", error);
                navigate("/"); // Mesmo com erro, redireciona para a página inicial
            });
    };

    return (
        <div>
            <div className="frame">
                <div className="text-wrapper">Cadastrar Evento</div>
            </div>
            <main>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome do Evento</label>
                        <input
                            type="text"
                            name="nomeEvento"
                            value={formData.nomeEvento}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Tipo do Evento</label>
                        <select
                            name="tipoEvento"
                            value={formData.tipoEvento}
                            onChange={handleChange}
                        >
                            <option value="">Selecione</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Congresso">Congresso</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Local do Evento</label>
                        <select
                            name="localEvento"
                            value={formData.localEvento}
                            onChange={handleChange}
                        >
                            <option value="">Selecione</option>
                            <option value="São Paulo">São Paulo</option>
                            <option value="Rio de Janeiro">Rio de Janeiro</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Número de Vagas</label>
                        <input
                            type="number"
                            name="numeroVagas"
                            value={formData.numeroVagas}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Valor da Inscrição</label>
                        <input
                            type="text"
                            name="valorInscricao"
                            value={formData.valorInscricao}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Data de Início</label>
                        <input
                            type="date"
                            name="dataInicio"
                            value={formData.dataInicio}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Data de Término</label>
                        <input
                            type="date"
                            name="dataFim"
                            value={formData.dataFim}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn-enviar">
                        Finalizar
                    </button>
                </form>
            </main>
            <footer>
                <div className="pagination">
                    <a href="/" className="btn-voltar">Voltar</a>
                </div>
            </footer>
        </div>
    );
}

export default EventForm;
