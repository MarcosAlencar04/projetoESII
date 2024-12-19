import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import formImage from "../img/es2.svg"; 
import "../css/EventForm2.css";

function EventForm2() {
    const navigate = useNavigate();

    const [evento, setEvento] = useState({
        nome: "",
        tipoEventos: "",
        local: "",
        dataInicio: "",
        dataTermino: "",
        vagasDisponiveis: "",
        valorInscricao: "",
    });

    const [tipoEventos, setTipoEventos] = useState([]);
   
   useEffect(() => {
       fetch("http://localhost:8080/tipoEventos/buscarTipos", {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro ao buscar tipos de eventos");
            }
            return response.json();
        })
        .then((data) => {
            setTipoEventos(data);
        })
        .catch((error) => {
            console.error("Erro ao buscar tipos de eventos:", error);
        });
    
   }, []);
   
   const handleChange = (e) => {
       const { name, value } = e.target;
       setEvento({ ...evento, [name]: value });
   };
   
   const handleSubmit = (e) => {
       e.preventDefault();

       const usuarioId = localStorage.getItem("usuarioId");
        if (!usuarioId) {
            alert("Você não está logado. Por favor, faça login para cadastrar eventos.");
            navigate("/")
            return;
        }

       const isAdm = localStorage.getItem("usuarioIsAdm");
       if (isAdm !== "true") {
           alert("Você não tem permissão para cadastrar eventos.");
            navigate("/HomeLogged")
       } else{
        enviarDados(evento);
        }
   };
   
   const enviarDados = (evento) => {
       fetch("http://localhost:8080/eventos/cadastrarEvento", {
           method: "POST",
           headers: {
               "Content-Type": "application/json",
           },
           body: JSON.stringify(evento),
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
               alert("Evento cadastrado com sucesso!");
               console.log("Resposta do backend:", data);
               const usuarioId = localStorage.getItem("usuarioId");
                navigate("/HomeLogged")
           })
           .catch((error) => {
               console.error("Erro ao enviar os dados:", error);
               alert("Ocorreu um erro ao tentar cadastrar o evento.");
           });
   };
   
   return (
       <div className="container">
           <div className="form-image">
               <img src={formImage} alt="Form Image" />
           </div>
           <div className="form">
               <form id="evento_form" onSubmit={handleSubmit}>
                   <div className="form_header">
                       <div className="title">
                           <h1>Cadastrar Evento</h1>
                       </div>
                   </div>
                   <div className="input-box">
                       <label htmlFor="nomeEvento">Nome do Evento</label>
                       <input
                           id="nomeEvento"
                           name="nome"
                           type="text"
                           placeholder="Digite o Nome do Evento"
                           value={evento.nome}
                           onChange={handleChange}
                           required
                       />
                   </div>
                   <div className="input-box">
                       <label htmlFor="tipoEvento">Tipo do Evento</label>
                       <select
                           id="tipoEvento"
                           name="tipoEventos"
                           value={evento.tipoEventos}
                           onChange={handleChange}
                           required
                       >
                           <option value="">Selecione o Tipo do Evento</option>
                           {tipoEventos.map((tipo) => (
                               <option key={tipo.descricao} value={tipo.descricao}>
                                   {tipo.descricao}
                               </option>
                           ))}
                       </select>
                   </div>
                   <div className="input-box">
                       <label htmlFor="localEvento">Local do Evento</label>
                       <input
                           id="localEvento"
                           name="local"
                           type="text"
                           placeholder="Digite o Local do Evento"
                           value={evento.local}
                           onChange={handleChange}
                           required
                       />
                   </div>
                   <div className="input-box">
                       <label htmlFor="numeroVagas">Número de Vagas</label>
                       <input
                           id="numeroVagas"
                           name="vagasDisponiveis"
                           type="number"
                           placeholder="Digite o Número de Vagas"
                           value={evento.vagasDisponiveis}
                           onChange={handleChange}
                           required
                       />
                   </div>
                   <div className="input-box">
                       <label htmlFor="valorInscricao">Valor da Inscrição</label>
                       <input
                           id="valorInscricao"
                           name="valorInscricao"
                           type="number"
                           placeholder="Digite o Valor da Inscrição"
                           value={evento.valorInscricao}
                           onChange={handleChange}
                           required
                       />
                   </div>
                   <div className="input-box">
                       <label htmlFor="dataInicio">Data de Início</label>
                       <input
                           id="dataInicio"
                           name="dataInicio"
                           type="date"
                           value={evento.dataInicio}
                           onChange={handleChange}
                           required
                       />
                   </div>
                   <div className="input-box">
                       <label htmlFor="dataFim">Data de Fim</label>
                       <input
                           id="dataFim"
                           name="dataTermino"
                           type="date"
                           value={evento.dataTermino}
                           onChange={handleChange}
                           required
                       />
                   </div>
                   <div className="sign-button">
                       <button type="submit" className="botao">
                           Cadastrar Evento
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

export default EventForm2;
