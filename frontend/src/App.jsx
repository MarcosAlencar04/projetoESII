import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import EventForm from "./components/EventForm.jsx";
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
                    <Route path="/register" element={<EventForm />} />
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/recuperarSenha" element={<RecuperarSenha/>}/>
                    <Route path="/cadastrarUsuario" element={<CadastroUsuario/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App; // Agora estamos exportando corretamente
