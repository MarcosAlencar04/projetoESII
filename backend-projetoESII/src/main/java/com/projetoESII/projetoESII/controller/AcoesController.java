package com.projetoESII.projetoESII.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetoESII.projetoESII.dao.AcoesDao;
import com.projetoESII.projetoESII.dao.EventosDao;
import com.projetoESII.projetoESII.dao.TipoAcoesDao;
import com.projetoESII.projetoESII.dao.UsuarioDao;
import com.projetoESII.projetoESII.dto.AcoesRequestDTO;
import com.projetoESII.projetoESII.dto.AcoesResponseDTO;
import com.projetoESII.projetoESII.entity.Acoes;
import com.projetoESII.projetoESII.entity.Eventos;

import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/acoes")
public class AcoesController {
    
    @Autowired
    private AcoesDao dao;

    @Autowired
    private TipoAcoesDao tipoDao;

    @Autowired
    private UsuarioDao usuarioDao;
    
    @Autowired
    private EventosDao eventoDao;

    @PostMapping("/cadastrarAcao")
    public ResponseEntity<?> saveAcao(@RequestBody AcoesRequestDTO data) {
    try {
        Acoes acoesData = new Acoes(data);

        acoesData.setTipoAcoes(
            Optional.ofNullable(tipoDao.findByDescricao(data.tipoAcoes()))
                    .orElseThrow(() -> new IllegalArgumentException("Tipo de ação não encontrado: " + data.tipoAcoes()))
        );

        acoesData.setUsuarioResponsavel(
            Optional.ofNullable(usuarioDao.findByNome(data.usuarioResponsavel()))
                    .orElseThrow(() -> new IllegalArgumentException("Responsável não encontrado: " + data.usuarioResponsavel()))
        );

        acoesData.setEvento(
            Optional.ofNullable(eventoDao.findByNome(data.evento()))
                    .orElseThrow(() -> new IllegalArgumentException("Evento não encontrado: " + data.evento()))
        );

        dao.save(acoesData);

        return ResponseEntity.ok().body(Map.of(
            "message", "Ação cadastrada com sucesso!"
        ));
    } catch (IllegalArgumentException e) {
        return ResponseEntity.status(400).body(Map.of(
            "message", e.getMessage()
        ));
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body(Map.of(
            "message", "Erro ao cadastrar ação.",
            "error", e.getMessage()
        ));
    }
}


    @GetMapping("/buscarAcoes")
    public List<AcoesResponseDTO> getAll(){
        List<AcoesResponseDTO> list = dao.findAll().stream().map(AcoesResponseDTO::new).toList();
        return list;
    }

    @GetMapping("/buscarPorEvento")
    public List<AcoesResponseDTO> getByEvento(@RequestParam("nome") String nome) {
        Eventos evento = eventoDao.findByNome(nome);
        List<AcoesResponseDTO> list = dao.findByEvento(evento).stream().map(AcoesResponseDTO::new).toList();
        return list;
    }


    


}
