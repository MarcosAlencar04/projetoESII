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
                </div>
            </div>
            </div>
        </div>
        </div>

    );
}

export default Home;
