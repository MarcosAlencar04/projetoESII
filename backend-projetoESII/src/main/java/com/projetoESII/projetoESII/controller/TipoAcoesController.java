package com.projetoESII.projetoESII.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetoESII.projetoESII.dao.TipoAcoesDao;
import com.projetoESII.projetoESII.dto.TipoAcoesResponseDTO;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/tipoAcoes")
public class TipoAcoesController {

    @Autowired
    private TipoAcoesDao dao;

    @GetMapping("/buscarTipos")
    public List<TipoAcoesResponseDTO> getAll(){
        List<TipoAcoesResponseDTO> list = dao.findAll().stream().map(TipoAcoesResponseDTO::new).toList();
        return list;
    }
}
