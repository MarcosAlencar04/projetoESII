package com.projetoESII.projetoESII.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetoESII.projetoESII.entity.TipoAcoes;

public interface TipoAcoesDao extends JpaRepository<TipoAcoes, Long>{

    TipoAcoes findByDescricao(String descricao);

}
