import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import formImage from "../img/es2.svg";
import "../css/CriarAcao.css";

function CriarAcao() {
    const navigate = useNavigate();

    const [acao, setAcao] = useState({
        titulo: "",
        tipoAcoes: "",
        usuarioResponsavel: "",
        evento: "",
        dataInicio: "",
        dataTermino: "",
        valor: "",
        vagasDisponiveis: "",
    });

    const [responsaveis, setResponsaveis] = useState([]);
    const [tiposAcao, setTiposAcao] = useState([]);
    const [eventos, setEventos] = useState([]);

    // Verificação de acesso ao carregar o componente
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

        // Busca os tipos de ações
        fetch("http://localhost:8080/tipoAcoes/buscarTipos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setTiposAcao(data))
            .catch((error) => console.error("Erro ao buscar tipos de ações:", error));

        fetch("http://localhost:8080/usuarios/buscarResponsaveis", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setResponsaveis(data))
            .catch((error) => console.error("Erro ao buscar responsáveis:", error));

        fetch("http://localhost:8080/eventos/buscarEventos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setEventos(data))
            .catch((error) => console.error("Erro ao buscar eventos:", error));
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        const parsedValue = name === "valor" 
            ? parseFloat(value)
            : name === "vagasDisponiveis"
            ? parseInt(value, 10)
            : value;

        setAcao({ ...acao, [name]: parsedValue });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Payload enviado:", acao);

        fetch("http://localhost:8080/acoes/cadastrarAcao", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(acao),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro na resposta do servidor: " + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                alert("Ação cadastrada com sucesso!");
                navigate("/visualizar"); // Redireciona para a página de visualização
            })
            .catch((error) => {
                console.error("Erro ao enviar os dados:", error);
                alert("Ocorreu um erro ao tentar cadastrar a ação.");
            });
    };

    return (
        <div className="criarAcaoContainer">
            <div className="criarAcaoFormImage">
                <img src={formImage} alt="Form Image" />
            </div>
            <div className="criarAcaoForm">
                <form id="acao_form" onSubmit={handleSubmit}>
                    <div className="criarAcaoFormHeader">
                        <div className="criarAcaoTitle">
                            <h1>Cadastrar Ação</h1>
                        </div>
                    </div>
                    <div className="criarAcaoInputBox">
                        <label htmlFor="titulo">Título da Ação</label>
                        <input
                            id="titulo"
                            name="titulo"
                            type="text"
                            placeholder="Digite o título da ação"
                            value={acao.titulo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="criarAcaoInputBox">
                        <label htmlFor="tipoAcoes">Tipo de Ação</label>
                        <select
                            id="tipoAcoes"
                            name="tipoAcoes"
                            value={acao.tipoAcoes}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione o tipo de ação</option>
                            {tiposAcao.map((tipo) => (
                                <option key={tipo.id} value={tipo.descricao}>
                                    {tipo.descricao}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="criarAcaoInputBox">
                        <label htmlFor="usuarioResponsavel">Responsável</label>
                        <select
                            id="usuarioResponsavel"
                            name="usuarioResponsavel"
                            value={acao.usuarioResponsavel}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione o responsável</option>
                            {responsaveis.map((resp) => (
                                <option key={resp.id} value={resp.nome}>
                                    {resp.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="criarAcaoInputBox">
                        <label htmlFor="evento">Evento</label>
                        <select
                            id="evento"
                            name="evento"
                            value={acao.evento}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione o evento</option>
                            {eventos.map((evento) => (
                                <option key={evento.id} value={evento.nome}>
                                    {evento.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="criarAcaoInputBox">
                        <label htmlFor="dataInicio">Data de Início</label>
                        <input
                            id="dataInicio"
                            name="dataInicio"
                            type="date"
                            value={acao.dataInicio}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="criarAcaoInputBox">
                        <label htmlFor="dataTermino">Data de Término</label>
                        <input
                            id="dataTermino"
                            name="dataTermino"
                            type="date"
                            value={acao.dataTermino}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="criarAcaoInputBox">
                        <label htmlFor="valor">Valor</label>
                        <input
                            id="valor"
                            name="valor"
                            type="number"
                            step="0.01"
                            placeholder="Digite o valor"
                            value={acao.valor}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="criarAcaoInputBox">
                        <label htmlFor="vagasDisponiveis">Vagas Disponíveis</label>
                        <input
                            id="vagasDisponiveis"
                            name="vagasDisponiveis"
                            type="number"
                            placeholder="Digite a quantidade de vagas"
                            value={acao.vagasDisponiveis}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="criarAcaoSignButton">
                        <button type="submit" className="criarAcaoBotao">
                            Cadastrar Ação
                        </button>
                        <div className="criarAcaoBackButton">
                            <a href={`/visualizar`} className="criarAcaoButtonStyle">
                                Voltar
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CriarAcao;
