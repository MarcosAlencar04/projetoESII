package com.projetoESII.projetoESII.dto;

import java.util.Date;

public record EventosRequestDTO(String tipoEventos, String nome, String local, Date dataInicio, Date dataTermino, Integer vagasDisponiveis, Double valorInscricao) {

}
