package com.projetoESII.projetoESII.dto;

import java.util.Date;

import com.projetoESII.projetoESII.entity.Acoes;
import com.projetoESII.projetoESII.entity.Eventos;
import com.projetoESII.projetoESII.entity.TipoAcoes;
import com.projetoESII.projetoESII.entity.Usuario;

public record AcoesResponseDTO(Long id,
    Eventos evento,
    TipoAcoes tipoAcoes,
    Usuario usuarioResponsavel,
    String titulo, Date dataInicio, Date dataTermino, Double valor, Integer vagasDisponiveis){

    public AcoesResponseDTO(Acoes acao) {
        this(
            acao.getId(),
            acao.getEvento(),
            acao.getTipoAcoes(),
            acao.getUsuarioResponsavel(),
            acao.getTitulo(),
            acao.getDataInicio(),
            acao.getDataTermino(),
            acao.getValor(),
            acao.getVagasDisponiveis()
            );
    }
}
