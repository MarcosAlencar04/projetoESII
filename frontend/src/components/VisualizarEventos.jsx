import React from "react";
import styles from '../css/VisualizarEventos.module.css';

function VisualizarEventos() {
    const eventos = [
        {
            id: 1,
            nome: "Workshop de React",
            data: "20/12/2024",
            local: "São Paulo",
            acoes: [
                { id: 1, tipo: "Palestra", nome: "Introdução ao React" },
                { id: 2, tipo: "Minicurso", nome: "Hooks Avançados" },
            ],
        },
        {
            id: 2,
            nome: "Congresso de IA",
            data: "25/12/2024",
            local: "Rio de Janeiro",
            acoes: [
                { id: 1, tipo: "Palestra", nome: "Fundamentos de IA" },
            ],
        },
    ];

    return (
        <div className={styles.visualizar_container}>
            <div className={styles.frame}>
                <div className={styles.text_wrapper}>Visualizar Eventos</div>
                <a href="/" className="botao">Home</a>
            </div>
            <div className={styles.eventos_container}>
                {eventos.map((evento) => (
                    <div key={evento.id} className={styles.evento_card}>
                        <h3>{evento.nome}</h3>
                        <p>Data: {evento.data}</p>
                        <p>Local: {evento.local}</p>
                        <div className={styles.acoes_container}>
                            <h4>Ações:</h4>
                            {evento.acoes.length > 0 ? (
                                <ul>
                                    {evento.acoes.map((acao) => (
                                        <li key={acao.id}>
                                            {acao.tipo}: {acao.nome}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Sem ações cadastradas</p>
                            )}
                        </div>
                        <a href={`/eventos/${evento.id}/criar-acao`} className="botao">Criar Ação</a>
                        </div>
                ))}
            </div>
        </div>
    );
}

export default VisualizarEventos;
