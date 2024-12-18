import React from "react";
import "../css/style_login.css";
import logo from "../img/logo_login.png";

function Login() {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Login realizado com sucesso!");
    };

    
    return (
        <section className="area-login">
            <div className="login">
                <div>
                    <img src={logo} alt="Logo" />
                </div>
                <form id="login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome de Usuário"
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        name="senha"
                        placeholder="Senha"
                        required
                    />
                    <input type="submit" value="Entrar" />
                </form>
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
