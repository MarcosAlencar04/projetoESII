package com.projetoESII.projetoESII.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projetoESII.projetoESII.dao.UsuarioDao;
import com.projetoESII.projetoESII.dto.UsuarioRequestDTO;
import com.projetoESII.projetoESII.dto.UsuarioResponseDTO;
import com.projetoESII.projetoESII.entity.Usuario;
import com.projetoESII.projetoESII.service.EmailService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/usuarios")
public class UsuarioController {
    
    @Autowired
    private UsuarioDao dao;

    @Autowired
    private EmailService emailService;

    @PostMapping("/cadastrarUsuario")
    public ResponseEntity<?> saveUsuario(@RequestBody UsuarioRequestDTO data) {
        try {
            Usuario usuarioData = new Usuario(data);
            Usuario usuarioSalvo = dao.save(usuarioData);
            
            emailService.enviarEmailConfirmacao(usuarioSalvo.getEmail(), usuarioSalvo.getId());

            return ResponseEntity.ok().body(Map.of(
                "message", "Usuário cadastrado com sucesso! Confirme através do email.",
                "userId", usuarioData.getId() // Retorna o ID do usuário recém-criado (ajuste conforme necessário)
            ));
        } catch (Exception e) {
            // Trata erros e retorna uma resposta adequada
            return ResponseEntity.status(500).body(Map.of(
                "message", "Erro ao cadastrar usuário.",
                "error", e.getMessage()
            ));
        }
    }

    @GetMapping("/buscarUsuarios")
    public List<UsuarioResponseDTO> getAll(){
        List<UsuarioResponseDTO> list = dao.findAll().stream().map(UsuarioResponseDTO::new).toList();
        return list;
    }

    @GetMapping("/confirmarCadastro")
    public ResponseEntity<?> confirmarCadastro(@RequestParam Long id) {
        Optional<Usuario> optionalUsuario = dao.findById(id);

        if (optionalUsuario.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of(
                "message", "Usuário não encontrado."
            ));
        }

        Usuario usuario = optionalUsuario.get();
        if (usuario.isStatusConfirmado()) {
            return ResponseEntity.badRequest().body(Map.of(
                "message", "Usuário já está confirmado."
            ));
        }

        usuario.setStatusConfirmado(true);
        dao.save(usuario);

        return ResponseEntity.ok().body(
            "Cadastro confirmado com sucesso!"
        );
    }
}
