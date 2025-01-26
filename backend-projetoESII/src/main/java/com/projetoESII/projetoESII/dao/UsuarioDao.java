package com.projetoESII.projetoESII.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetoESII.projetoESII.entity.Usuario;

public interface UsuarioDao extends JpaRepository<Usuario, Long>{

    Usuario findByEmail(String email);

    Usuario findByNome(String nome);

    List<Usuario> findByIsResponsavel(boolean isResponsavel);
}
