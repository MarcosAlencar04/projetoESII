package com.projetoESII.projetoESII.dto;

import com.projetoESII.projetoESII.entity.TipoAcoes;

public record TipoAcoesResponseDTO (Long id, String descricao) {
    public TipoAcoesResponseDTO(TipoAcoes tipoAcoes){
        this(tipoAcoes.getId(), tipoAcoes.getDescricao());
    }
}
