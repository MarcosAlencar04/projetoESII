import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/style_login.css";
import logo from "../img/logo_login.png";

function Login() {
    const navigate = useNavigate(); // Hook para redirecionar
    const [credentials, setCredentials] = useState({ email: "", senha: "" }); // Estado para armazenar os dados do formulário
    const [error, setError] = useState(null); // Estado para exibir erros

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Envia os dados de login para o backend
        fetch("http://localhost:8080/usuarios/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((text) => {
                        throw new Error(text); // Lança o texto retornado como erro
                    });
                }
                return response.json();
            })
            .then((data) => {
                // Armazena os dados do usuário no localStorage
                localStorage.setItem("usuarioId", data.id);
                localStorage.setItem("usuarioNome", data.nome);
                localStorage.setItem("usuarioIsAdm", data.isAdm);
                localStorage.setItem("usuarioStatusConfirmado", data.statusConfirmado);

                alert("Login realizado com sucesso!");
                console.log("Resposta do backend:", data);
                navigate("/HomeLogged"); // Redireciona para a página HomeLogged
            })
            .catch((error) => {
                console.error("Erro ao realizar login:", error.message);
                setError(error.message || "Usuário ou senha inválidos. Tente novamente.");
            });
    };

    return (
        <section className="area-login">
            <div className="login">
                <div>
                    <img src={logo} alt="Logo" />
                </div>
                <form id="login-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        name="senha"
                        placeholder="Senha"
                        value={credentials.senha}
                        onChange={handleChange}
                        required
                    />
                    <input type="submit" value="Entrar" />
                </form>
                {error && <p className="error">{error}</p>} {/* Exibe mensagem de erro */}
                <div className="extra-buttons">
                    <a href="/cadastrarUsuario" className="button">
                        Cadastrar
                    </a>
                    <a href="/recuperarSenha" className="button">
                        Esqueci Minha Senha
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Login;
