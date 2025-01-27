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
import com.projetoESII.projetoESII.entity.Acoes;
import com.projetoESII.projetoESII.entity.Inscricoes;

import jakarta.transaction.Transactional;

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
    
    @Transactional
    @PostMapping("/realizarInscricao")
    public ResponseEntity<?> saveInscricao(@RequestBody InscricoesRequestDTO data) {
        try {
            Acoes acao = acoesDao.findByTitulo(data.acao());
        
            if (acao.getVagasDisponiveis() <= 0) {
                return ResponseEntity.status(400).body(Map.of(
                "message", "Não há vagas disponíveis para essa ação."
                ));
            }
        
            Inscricoes inscricoesData = new Inscricoes(data);
            inscricoesData.setEvento(eventosDao.findByNome(data.evento()));
            inscricoesData.setUsuario(usuarioDao.findByNome(data.usuario()));

            acao.setVagasDisponiveis(acao.getVagasDisponiveis() - 1);
            acoesDao.save(acao);
            inscricoesData.setAcao(acao);

            dao.save(inscricoesData);

            return ResponseEntity.ok().body(Map.of(
            "message", "Inscrição realizada com sucesso!"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "message", "Erro ao realizar a inscrição.",
                "error", e.getMessage()
            ));
        }
    }
}
