import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import formImage from "../img/es2.svg"; 
import "../css/CriarResponsavel.css"; // CSS próprio para não conflitar

function CriarResponsavel() {
  const navigate = useNavigate();

  const [responsavel, setResponsavel] = useState({
    usuarioId: "", // Mantém apenas o ID do usuário selecionado
  });

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/usuarios/buscarUsuarios", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar usuários");
        }
        return response.json();
      })
      .then((data) => {
        setUsuarios(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar usuários:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponsavel({ ...responsavel, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Encontra o nome do usuário selecionado com base no ID
    const usuarioSelecionado = usuarios.find(
      (usuario) => usuario.id === parseInt(responsavel.usuarioId)
    );

    if (!usuarioSelecionado) {
      alert("Usuário inválido!");
      return;
    }

    const payload = {
      nome: usuarioSelecionado.nome, // Apenas o nome do usuário será enviado
    };

    fetch("http://localhost:8080/usuarios/setResponsavel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na resposta do servidor: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        alert("Responsável definido com sucesso!");
        // navigate("/visualizarResponsaveis");
      })
      .catch((error) => {
        console.error("Erro ao enviar os dados:", error);
        alert("Ocorreu um erro ao tentar definir o responsável.");
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
              <h1>Definir Responsável</h1>
            </div>
          </div>
          
          {/* Nome */}
          <div className="criarResponsavelInputBox">
            <label htmlFor="nomeResponsavel">Nome do Responsável</label>
            <select
              id="nomeResponsavel"
              name="usuarioId"
              value={responsavel.usuarioId}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um usuário</option>
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="criarResponsavelSignButton">
            <button type="submit" className="criarResponsavelBotao">
              Definir
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
