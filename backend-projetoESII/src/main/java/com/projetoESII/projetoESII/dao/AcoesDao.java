package com.projetoESII.projetoESII.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetoESII.projetoESII.entity.Acoes;
import com.projetoESII.projetoESII.entity.Eventos;

public interface AcoesDao extends JpaRepository<Acoes, Long>{

    List<Acoes> findByEvento(Eventos evento);

    Acoes findByTitulo(String titulo);
}
