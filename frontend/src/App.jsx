import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import HomeLogged from "./components/HomeLogged.jsx";
import EventForm from "./components/EventForm.jsx";
import EventForm2 from "./components/EventForm2.jsx";
import Login from "./components/login.jsx";
import CadastroUsuario from "./components/cadastroUsuario.jsx";
import RecuperarSenha from "./components/recuperarSenha.jsx";
import './main.css'


function App() {
    return (
        <Router>
            <div className="main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/HomeLogged" element={<HomeLogged/>} />
                    <Route path="/register2" element={<EventForm/>} />
                    <Route path="/register" element={<EventForm2/>} />
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/recuperarSenha" element={<RecuperarSenha/>}/>
                    <Route path="/cadastrarUsuario" element={<CadastroUsuario/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App; // Agora estamos exportando corretamente
