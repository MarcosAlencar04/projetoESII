import React from "react";
import styles from '../css/Home.module.css'

function Home() {
    return (
        <div className={styles.home_container}>
            <div className={styles.frame}>
                    <div className={styles.text_wrapper}>Página Inicial</div>
                    <a href="/login" className="botao">Login</a>
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

export default Home;
