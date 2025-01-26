package com.projetoESII.projetoESII.entity;

import com.projetoESII.projetoESII.dto.UsuarioRequestDTO;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "usuarios")
@Entity(name = "usuarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Usuario {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public String nome;
    public String cpf;
    public String senha;
    public boolean statusConfirmado;
    public boolean isAdm;
    public boolean isResponsavel;
    public String email;

    public Usuario(UsuarioRequestDTO data){
        this.nome = data.nome();
        this.cpf = data.cpf();
        this.senha = data.senha();
        this.statusConfirmado = data.statusConfirmado();
        this.isAdm = data.isAdm();
        this.email = data.email();
        this.isResponsavel = data.isResponsavel();
    }
    
    
}