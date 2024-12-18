import React, { useState } from "react";
import "../css/style.css";
import esImage from "../img/es.svg";

function RecuperarSenha() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const usuario = {
            email: email,
        };

        
        enviarEmail(usuario);
    };

    const enviarEmail = (usuario) => {
        fetch("URL_DO_SEU_BACKEND", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario),
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
                alert("Email enviado com sucesso!");
                console.log("Resposta do backend:", data);
            })
            .catch((error) => {
                console.error("Erro ao enviar os dados:", error);
                alert("Ocorreu um erro ao tentar enviar o email.");
            });
    };

    return (
      <div className="container">
        <div className="form-image">
          {/* Uso da imagem com importação correta */}
          <img src={esImage} alt="Imagem de Recuperação" />
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="form-header">
              <div className="title">
                <h1>Recuperação de Senha</h1>
              </div>
              <div className="line"></div>{" "}
              {/* Linha decorativa abaixo do título */}
            </div>
            <div className="input-group">
              <div className="input-box">
                <label htmlFor="recSenha">Email para Recuperação</label>
                <input
                  id="recSenha"
                  name="recSenha"
                  type="email"
                  placeholder="Digite o Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="sign-button">
              <button type="submit" className="botao">
                Enviar
              </button>
              <div className="back-button">
                <a href="/" className="button-style">
                  Voltar
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
}

export default RecuperarSenha;
