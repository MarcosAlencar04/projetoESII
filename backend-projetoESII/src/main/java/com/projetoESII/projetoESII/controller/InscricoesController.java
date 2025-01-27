package com.projetoESII.projetoESII.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetoESII.projetoESII.dao.AcoesDao;
import com.projetoESII.projetoESII.dao.EventosDao;
import com.projetoESII.projetoESII.dao.InscricoesDao;
import com.projetoESII.projetoESII.dao.UsuarioDao;
import com.projetoESII.projetoESII.dto.InscricoesRequestDTO;
import com.projetoESII.projetoESII.entity.Inscricoes;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/inscricoes")
public class InscricoesController {

    @Autowired
    private InscricoesDao dao;

    @Autowired
    private AcoesDao acoesDao;

    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private EventosDao eventosDao;
    
    @PostMapping("/realizarInscricao")
    public ResponseEntity<?> saveInscricao(@RequestBody InscricoesRequestDTO data) {
        try {
            
            Inscricoes inscricoesData = new Inscricoes(data);
            inscricoesData.setAcao(acoesDao.findByTitulo(data.acao()));
            inscricoesData.setEvento(eventosDao.findByNome(data.evento()));
            inscricoesData.setUsuario(usuarioDao.findByNome(data.usuario()));

            dao.save(inscricoesData);

            return ResponseEntity.ok().body(Map.of(
                "message", "Usuário cadastrado com sucesso! Confirme através do email."
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "message", "Erro ao cadastrar usuário.",
                "error", e.getMessage()
            ));
        }
    }    
}
