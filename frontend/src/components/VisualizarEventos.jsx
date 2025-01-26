import React, { useState, useEffect } from "react";
import styles from '../css/VisualizarEventos.module.css';

function VisualizarEventos() {
    const [eventos, setEventos] = useState([]); // Estado para armazenar os eventos
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
    const [error, setError] = useState(null); // Estado para tratar erros

    useEffect(() => {
        // Faz a chamada para o backend
        fetch("http://localhost:8080/eventos/buscarEventos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar eventos");
                }
                return response.json();
            })
            .then((data) => {
                setEventos(data); // Armazena os eventos no estado
                setLoading(false); // Finaliza o carregamento
            })
            .catch((error) => {
                console.error("Erro ao buscar eventos:", error);
                setError("Ocorreu um erro ao buscar os eventos."); // Define o erro no estado
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Carregando eventos...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.visualizar_container}>
            <div className={styles.frame}>
                <div className={styles.text_wrapper}>Visualizar Eventos</div>
                <a href="/" className="botao">Home</a>
            </div>
            <div className={styles.eventos_container}>
                {eventos.length > 0 ? (
                    eventos.map((evento) => (
                        <div key={evento.id} className={styles.evento_card}>
                            <h3>{evento.nome}</h3>
                            <p>Tipo: {evento.tipoEventos.descricao}</p>
                            <p>Data Início: {new Date(evento.dataInicio).toLocaleDateString()}</p>
                            <p>Data Término: {new Date(evento.dataTermino).toLocaleDateString()}</p>
                            <p>Local: {evento.local}</p>
                            <p>Vagas Disponíveis: {evento.vagasDisponiveis}</p>
                            <p>Valor Inscrição: R$ {evento.valorInscricao.toFixed(2)}</p>
                        </div>
                    ))
                ) : (
                    <p>Nenhum evento disponível.</p>
                )}
            </div>
        </div>
    );
}

export default VisualizarEventos;
