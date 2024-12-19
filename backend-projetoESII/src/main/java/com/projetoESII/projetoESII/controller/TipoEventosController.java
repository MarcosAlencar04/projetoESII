package com.projetoESII.projetoESII.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetoESII.projetoESII.dao.TipoEventosDao;
import com.projetoESII.projetoESII.dto.TipoEventosResponseDTO;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/tipoEventos")
public class TipoEventosController {

    @Autowired
    private TipoEventosDao dao;

    @GetMapping("/buscarTipos")
    public List<TipoEventosResponseDTO> getAll(){
        List<TipoEventosResponseDTO> list = dao.findAll().stream().map(TipoEventosResponseDTO::new).toList();
        return list;
    }
}
