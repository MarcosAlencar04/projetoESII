package com.projetoESII.projetoESII.dto;

import com.projetoESII.projetoESII.entity.Usuario;

public record UsuarioResponseDTO(Long id, String nome, String cpf, String senha, boolean statusConfirmado, boolean isAdm, boolean isResponsavel, String email) {
    public UsuarioResponseDTO(Usuario usuario){
        this(usuario.getId(), usuario.getNome(), usuario.getCpf(), usuario.getSenha(), usuario.isStatusConfirmado(), usuario.isAdm(), usuario.isResponsavel(), usuario.getEmail());
    }
}
