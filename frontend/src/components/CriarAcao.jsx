import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import formImage from "../img/es2.svg";
import "../css/CriarAcao.css";

function CriarAcao() {
    const navigate = useNavigate();
    const { eventoId } = useParams(); // Obtém o ID do evento pela URL

    const [acao, setAcao] = useState({
        nome: "",
        tipo: "",
        duracao: "",
        dataInicio: "",
        dataTermino: "",
        valor: "",
        vagas: "",
        responsavel: "",
    });

    const [responsaveis, setResponsaveis] = useState([]);
    const [tiposAcao, setTiposAcao] = useState([]);

    useEffect(() => {
        // Busca os tipos de ação
        fetch("http://localhost:8080/tipoAcoes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setTiposAcao(data))
            .catch((error) => console.error("Erro ao buscar tipos de ação:", error));

        // Busca os responsáveis
        fetch("http://localhost:8080/responsaveis", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setResponsaveis(data))
            .catch((error) => console.error("Erro ao buscar responsáveis:", error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAcao({ ...acao, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8080/eventos/${eventoId}/cadastrarAcao`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(acao),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        "Erro na resposta do servidor: " + response.statusText
                    );
                }
                return response.json();
            })
            .then((data) => {
                alert("Ação cadastrada com sucesso!");
                navigate(`/visualizar`); // Redireciona para a página de visualização
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
                        <label htmlFor="nomeAcao">Título da Ação</label>
                        <input
                            id="nomeAcao"
                            name="nome"
                            type="text"
                            placeholder="Digite o Título da Ação"
                            value={acao.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="criarAcaoInputBox">
                        <label htmlFor="tipoAcao">Tipo da Ação</label>
                        <select
                            id="tipoAcao"
                            name="tipo"
                            value={acao.tipo}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione o Tipo da Ação</option>
                            {tiposAcao.map((tipo) => (
                                <option key={tipo.id} value={tipo.nome}>
                                    {tipo.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="criarAcaoInputBox">
                        <label htmlFor="responsavelAcao">Responsável</label>
                        <select
                            id="responsavelAcao"
                            name="responsavel"
                            value={acao.responsavel}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione o Responsável</option>
                            {responsaveis.map((resp) => (
                                <option key={resp.id} value={resp.nome}>
                                    {resp.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="criarAcaoInputBox">
                        <label htmlFor="duracaoAcao">Duração (em horas)</label>
                        <input
                            id="duracaoAcao"
                            name="duracao"
                            type="number"
                            placeholder="Digite a duração em horas"
                            value={acao.duracao}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="criarAcaoInputBox">
                        <label htmlFor="valorAcao">Valor</label>
                        <input
                            id="valorAcao"
                            name="valor"
                            type="number"
                            placeholder="Digite o valor"
                            value={acao.valor}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="criarAcaoInputBox">
                        <label htmlFor="vagasAcao">Quantidade de Vagas</label>
                        <input
                            id="vagasAcao"
                            name="vagas"
                            type="number"
                            placeholder="Digite a quantidade de vagas"
                            value={acao.vagas}
                            onChange={handleChange}
                            required
                        />
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
