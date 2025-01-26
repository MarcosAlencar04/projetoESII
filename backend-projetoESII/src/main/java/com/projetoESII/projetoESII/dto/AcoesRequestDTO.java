package com.projetoESII.projetoESII.dto;

import java.util.Date;

public record AcoesRequestDTO(String evento, String tipoAcoes, String usuarioResponsavel, String titulo, Date dataInicio, Date dataTermino, Double valor, Integer vagasDisponiveis) {
}
