package com.projetoESII.projetoESII.dto;

import java.util.Date;

import com.projetoESII.projetoESII.entity.Eventos;
import com.projetoESII.projetoESII.entity.TipoEventos;

public record EventosResponseDTO(
    Long id,
    TipoEventos tipoEventos,
    String nome,
    String local,
    Date dataInicio,
    Date dataTermino,
    Integer vagasDisponiveis,
    Double valorInscricao) {
    
        public EventosResponseDTO(Eventos evento) {
        this(
            evento.getId(),
            evento.getTipoEventos(),
            evento.getNome(),
            evento.getLocal(),
            evento.getDataInicio(),
            evento.getDataTermino(),
            evento.getVagasDisponiveis(),
            evento.getValorInscricao()
        );
    }
}
