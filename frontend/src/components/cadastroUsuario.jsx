import React, { useState } from "react";
import "../css/style.css";
import formImage from "../img/es2.svg"; 

function CadastroUsuario() {
    const [usuario, setUsuario] = useState({
        nome: "",
        cpf: "",
        senha: "",
        statusConfirmado: false,
        isAdm: false,
        email: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        enviarDados(usuario);
    };

    const enviarDados = (usuario) => {
        fetch("http://localhost:8080/usuarios/cadastrarUsuario", {
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
                alert("Cadastro realizado com sucesso! Confirme através de email");
                console.log("Resposta do backend:", data);
            })
            .catch((error) => {
                console.error("Erro ao enviar os dados:", error);
                alert("Ocorreu um erro ao tentar realizar o cadastro.");
            });
    };

    const formatCPF = (value) => {
        return value
            .replace(/\D/g, "") // Remove tudo que não for número
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1"); // Garante que não ultrapasse 14 caracteres
    };
    
    const handleChangeCPF = (e) => {
        const { name, value } = e.target;
        const formattedValue = name === "cpf" ? formatCPF(value) : value;
        setUsuario({ ...usuario, [name]: formattedValue });
    };
    
    return (
        <div className="container">
            <div className="form-image">
                <img src={formImage} alt="Form Image"/>
            </div>
            <div className="form">
                <form id="cadastro_form" onSubmit={handleSubmit}>
                    <div className="form_header">
                        <div className="title">
                            <h1>Cadastrar Usuário</h1>
                        </div>
                    </div>
                        <div className="input-box">
                            <label htmlFor="nomeUsuario">Nome de Usuário</label>
                            <input
                                id="nomeUsuario"
                                name="nome"
                                type="text"
                                placeholder="Digite o Nome"
                                value={usuario.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-box">
                            <label htmlFor="senha">Senha</label>
                            <input
                                id="senha"
                                name="senha"
                                type="password"
                                placeholder="Digite a Senha"
                                value={usuario.senha}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-box">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Digite o Email"
                                value={usuario.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-box">
                            <label htmlFor="cpf">CPF</label>
                            <input
                                id="cpf"
                                name="cpf"
                                type="text"
                                placeholder="Digite o CPF"
                                value={usuario.cpf}
                                onChange={handleChangeCPF}
                                maxLength="14"
                                required
                            />
                        </div>
                    <div className="sign-button">
                        <button type="submit" className="botao">
                            Cadastrar
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

export default CadastroUsuario;
