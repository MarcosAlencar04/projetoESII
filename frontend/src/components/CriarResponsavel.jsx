import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import formImage from "../img/es2.svg"; 
import "../css/CriarResponsavel.css"; // CSS próprio para não conflitar

function CriarResponsavel() {
  const navigate = useNavigate();

  const [responsavel, setResponsavel] = useState({
    nome: "",
    email: "",
    telefone: ""
  });

  // Função para atualizar o state conforme o usuário digita nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponsavel({ ...responsavel, [name]: value });
  };

  // Função para enviar os dados do formulário ao backend
  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch("http://localhost:8080/responsaveis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(responsavel),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na resposta do servidor: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        alert("Responsável cadastrado com sucesso!");
        // Redireciona para alguma página (ajuste conforme sua rota)
        navigate("/visualizarResponsaveis");
      })
      .catch((error) => {
        console.error("Erro ao enviar os dados:", error);
        alert("Ocorreu um erro ao tentar cadastrar o responsável.");
      });
  };

  return (
    <div className="criarResponsavelContainer">
      <div className="criarResponsavelFormImage">
        <img src={formImage} alt="Form" />
      </div>
      <div className="criarResponsavelForm">
        <form id="responsavel_form" onSubmit={handleSubmit}>
          <div className="criarResponsavelFormHeader">
            <div className="criarResponsavelTitle">
              <h1>Cadastrar Responsável</h1>
            </div>
          </div>
          
          {/* Nome */}
          <div className="criarResponsavelInputBox">
            <label htmlFor="nomeResponsavel">Nome do Responsável</label>
            <input
              id="nomeResponsavel"
              name="nome"
              type="text"
              placeholder="Digite o nome completo"
              value={responsavel.nome}
              onChange={handleChange}
              required
            />
          </div>

          {/* E-mail */}
          <div className="criarResponsavelInputBox">
            <label htmlFor="emailResponsavel">E-mail</label>
            <input
              id="emailResponsavel"
              name="email"
              type="email"
              placeholder="Digite o e-mail"
              value={responsavel.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Telefone */}
          <div className="criarResponsavelInputBox">
            <label htmlFor="telefoneResponsavel">Telefone</label>
            <input
              id="telefoneResponsavel"
              name="telefone"
              type="text"
              placeholder="(XX) XXXX-XXXX"
              value={responsavel.telefone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="criarResponsavelSignButton">
            <button type="submit" className="criarResponsavelBotao">
              Cadastrar
            </button>
            <div className="criarResponsavelBackButton">
              <a href={`/`} className="criarResponsavelButtonStyle">
                Voltar
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CriarResponsavel;
