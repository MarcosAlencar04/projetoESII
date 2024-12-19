package com.projetoESII.projetoESII.dto;

import com.projetoESII.projetoESII.entity.TipoEventos;

public record TipoEventosResponseDTO(Long id, String descricao) {
    public TipoEventosResponseDTO(TipoEventos tipoEventos){
        this(tipoEventos.getId(), tipoEventos.getDescricao());
    }
}
