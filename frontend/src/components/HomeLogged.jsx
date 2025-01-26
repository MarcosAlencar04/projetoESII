import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../css/Home.module.css';

function HomeLogged() {
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const usuarioId = localStorage.getItem("usuarioId");
        const usuarioNome = localStorage.getItem("usuarioNome");

        if (usuarioId && usuarioNome) {
            setUsuario({ id: usuarioId, nome: usuarioNome });
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className={styles.home_container}>
            <div className={styles.frame}>
                <div className={styles.text_wrapper}>
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
                            {/* Novo wrapper para os 3 cards */}
                            <div className={styles.cardsWrapper}>
                            <a href="/register" className={`${styles.card} ${styles.card1}`}>
                                <h5>Cadastrar Evento</h5>
                            </a>
                            <a href="/visualizar" className={`${styles.card} ${styles.card2}`}>
                                <h5>Visualizar Eventos</h5>
                            </a>
                            <a href="/responsaveis" className={`${styles.card} ${styles.card3}`}>
                                <h5>Cadastrar Responsáveis</h5>
                            </a>
                            <a href="/inscricao" className={`${styles.card} ${styles.card4}`}>
                                <h5>Inscrever-se</h5>
                            </a>
                            <a href="/criar-acao" className={`${styles.card} ${styles.card1}`}>
                                <h5>Cadastrar acao</h5>
                            </a>
                            </div>
                        </div>
                        </div>
                    </div>
        </div>
    );
}

export default HomeLogged;
