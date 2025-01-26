package com.projetoESII.projetoESII.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetoESII.projetoESII.dao.EventosDao;
import com.projetoESII.projetoESII.dao.TipoEventosDao;
import com.projetoESII.projetoESII.dto.EventosRequestDTO;
import com.projetoESII.projetoESII.dto.EventosResponseDTO;
import com.projetoESII.projetoESII.entity.Eventos;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/eventos")
public class EventosController {
    
    @Autowired
    private EventosDao dao;

    @Autowired
    private TipoEventosDao tipoDao;

    @PostMapping("/cadastrarEvento")
    public ResponseEntity<?> saveUsuario(@RequestBody EventosRequestDTO data) {
        try {
            Eventos eventosData = new Eventos(data);
            eventosData.setTipoEventos(tipoDao.findByDescricao(data.tipoEventos()));
            dao.save(eventosData);

            return ResponseEntity.ok().body(Map.of(
                "message", "Evento Cadastrado com Sucesso!"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "message", "Erro ao cadastrar evento.",
                "error", e.getMessage()
            ));
        }
    }

    @GetMapping("/buscarEventos")
    public List<EventosResponseDTO> getAll(){
        List<EventosResponseDTO> list = dao.findAll().stream().map(EventosResponseDTO::new).toList();
        return list;
    }

}
