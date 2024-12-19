package com.projetoESII.projetoESII.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetoESII.projetoESII.entity.TipoEventos;

public interface TipoEventosDao extends JpaRepository<TipoEventos, Long>{

    TipoEventos findByDescricao(String descricao);

}
