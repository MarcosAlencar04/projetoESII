import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../css/Home.module.css';

function HomeLogged() {
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Busca o usuário do localStorage
        const usuarioId = localStorage.getItem("usuarioId");
        const usuarioNome = localStorage.getItem("usuarioNome");

        if (usuarioId && usuarioNome) {
            // Define o usuário no estado
            setUsuario({ id: usuarioId, nome: usuarioNome });
        }
    }, []);

    const handleLogout = () => {
        // Limpa o localStorage
        localStorage.clear();

        // Redireciona para a página inicial
        navigate("/");
    };

    return (
        <div className={styles.home_container}>
            <div className={styles.frame}>
                <div className={styles.text_wrapper}>
                    {/* Exibe o nome do usuário ou uma mensagem de carregando */}
                    {usuario ? `Bem-vindo, ${usuario.nome}` : "Carregando..."}
                </div>
                <button className="botao" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className={styles.containerhome}>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <h1>Gestão de Eventos</h1>
                    </div>
                    <div className={styles.col}>
                        <a href="/register" className={`${styles.card} ${styles.card1}`}>
                            <h5>Cadastrar Evento</h5>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeLogged;
