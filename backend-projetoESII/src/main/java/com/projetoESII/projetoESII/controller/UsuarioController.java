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
                "userId", usuarioData.getId()
            ));
        } catch (Exception e) {
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

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsuarioRequestDTO loginRequest) {
        Usuario usuario = dao.findByEmail(loginRequest.email());

        if (usuario == null) {
            return ResponseEntity.status(401).body("Usuário não encontrado.");
        }

        if (!usuario.getSenha().equals(loginRequest.senha()) || !usuario.getEmail().equals(loginRequest.email())) {
            return ResponseEntity.status(401).body("Credenciais Incorretas.");
        }

        if (!usuario.isStatusConfirmado()) {
            return ResponseEntity.status(403).body("Usuário ainda não confirmou o cadastro.");
        }

         return ResponseEntity.ok(new UsuarioResponseDTO(usuario.getId(),
                                                        usuario.getNome(),
                                                        usuario.getCpf(),
                                                        usuario.getSenha(),
                                                        usuario.isStatusConfirmado(),
                                                        usuario.isAdm(),
                                                        usuario.isResponsavel(),
                                                        usuario.getEmail()));
    }

    @PostMapping("setResponsavel")
    public ResponseEntity<?> setResponsavel(@RequestBody Map<String, String> body) {
        try {
            String nome = body.get("nome");
            Usuario usuario = dao.findByNome(nome);
            usuario.setResponsavel(true);
            dao.save(usuario);

            return ResponseEntity.ok().body(Map.of(
                "message", "Usuário definido como responsável com sucesso!"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "message", "Erro ao definir responsável.",
                "error", e.getMessage()
            ));
        }
    }

    @GetMapping("/buscarResponsaveis")
    public List<UsuarioResponseDTO> getResponsaveis() {
        List<UsuarioResponseDTO> list = dao.findByIsResponsavel(true).stream().map(UsuarioResponseDTO::new).toList();
        return list;
    }
    
    
}
