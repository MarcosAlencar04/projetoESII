package com.projetoESII.projetoESII.entity;

import java.util.Date;

import com.projetoESII.projetoESII.dto.EventosRequestDTO;

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

@Table(name = "eventos")
@Entity(name = "eventos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@ToString
public class Eventos {
    
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;    
    
    @ManyToOne
    @JoinColumn(name = "id_tipo_evento")
    private TipoEventos tipoEventos;

    private String nome;
    private String local;
    private Date dataInicio;
    private Date dataTermino;
    private Integer vagasDisponiveis;
    private Double valorInscricao;

    public Eventos(EventosRequestDTO data){
        this.nome = data.nome();
        this.local = data.local();
        this.dataInicio = data.dataInicio();
        this.dataTermino = data.dataTermino();
        this.vagasDisponiveis = data.vagasDisponiveis();
        this.valorInscricao = data.valorInscricao();
    }
}
