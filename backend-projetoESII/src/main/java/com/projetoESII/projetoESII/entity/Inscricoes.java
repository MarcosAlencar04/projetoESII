package com.projetoESII.projetoESII.entity;

import java.util.Date;

import com.projetoESII.projetoESII.dto.InscricoesRequestDTO;

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

@Table(name = "inscricoes")
@Entity(name = "inscricoes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@ToString
public class Inscricoes {
    
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;    
    
    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_evento")
    private Eventos evento;

    @ManyToOne
    @JoinColumn(name = "id_acao")
    private Acoes acao;

    private Date dataInscricao;

    public Inscricoes(InscricoesRequestDTO data){
        this.dataInscricao = data.dataInscricao();
    }

}


