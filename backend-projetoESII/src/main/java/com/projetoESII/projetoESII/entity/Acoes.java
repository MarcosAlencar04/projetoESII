package com.projetoESII.projetoESII.entity;

import java.util.Date;

import com.projetoESII.projetoESII.dto.AcoesRequestDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Table(name = "acoes")
@Entity(name = "acoes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@ToString
public class Acoes {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;    
    
    @ManyToOne
    @JoinColumn(name = "id_evento")
    private Eventos evento;

    @ManyToOne
    @JoinColumn(name = "id_tipo_acao")
    private TipoAcoes tipoAcoes;
    
    @ManyToOne
    @JoinColumn(name = "id_responsavel")
    private Usuario usuarioResponsavel;

    private String titulo;
    private Date dataInicio;
    private Date dataTermino;
    private Double valor;
    private Integer vagasDisponiveis;


    public Acoes(AcoesRequestDTO data){
        this.titulo = data.titulo();
        this.dataInicio = data.dataInicio();
        this.dataTermino = data.dataTermino();
        this.valor = data.valor();
        this.vagasDisponiveis = data.vagasDisponiveis();
    }
}
