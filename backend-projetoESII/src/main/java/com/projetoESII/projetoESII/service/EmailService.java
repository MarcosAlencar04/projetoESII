package com.projetoESII.projetoESII.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void enviarEmailConfirmacao(String emailDestino, Long userId) throws MessagingException {
        String linkConfirmacao = "http://localhost:8080/usuarios/confirmarCadastro?id=" + userId;
        
        String assunto = "Confirmação de Cadastro";
        String conteudoHtml = "<h1>Bem-vindo!</h1>"
                + "<p>Obrigado por se cadastrar. Clique no botão abaixo para confirmar seu cadastro:</p>"
                + "<a href='" + linkConfirmacao + "' style='padding: 10px 20px; color: white; background-color: blue; text-decoration: none;'>Confirmar Cadastro</a>";

        MimeMessage mensagem = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mensagem, true);

        helper.setTo(emailDestino);
        helper.setSubject(assunto);
        helper.setText(conteudoHtml, true);

        mailSender.send(mensagem);
    }
}
