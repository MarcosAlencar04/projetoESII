package com.projetoESII.projetoESII.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetoESII.projetoESII.entity.Usuario;

public interface UsuarioDao extends JpaRepository<Usuario, Long>{

    Usuario findByEmail(String email);

    Usuario findByNome(String nome);
}
