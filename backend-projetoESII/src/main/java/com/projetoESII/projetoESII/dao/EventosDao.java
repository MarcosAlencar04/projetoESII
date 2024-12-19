package com.projetoESII.projetoESII.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetoESII.projetoESII.entity.Eventos;

public interface EventosDao extends JpaRepository<Eventos, Long>{
}
