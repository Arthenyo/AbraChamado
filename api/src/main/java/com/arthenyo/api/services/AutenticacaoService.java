package com.arthenyo.api.services;

import com.arthenyo.api.dtos.EmailDTO;
import com.arthenyo.api.dtos.NovaSenhaDTO;
import com.arthenyo.api.entities.RecuperarSenha;
import com.arthenyo.api.entities.Usuario;
import com.arthenyo.api.repositories.RecuperarSenhaRepository;
import com.arthenyo.api.repositories.UsuarioRepository;
import com.arthenyo.api.services.exception.ObjectNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class AutenticacaoService {
    @Value("${email.password-recover.token.minutes}")
    private Long tokenMinutes;
    @Value("${email.password-recover.uri}")
    private String recoverUri;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private RecuperarSenhaRepository recuperarSenhaRepository;
    @Autowired
    private EmailService emailService;
    @Transactional
    public void criarTokenRecuperação(EmailDTO body) {
        Usuario usuario = usuarioRepository.findByEmail(body.getEmail());
        if(usuario == null){
            throw new ObjectNotFound("Email nao encontrado");
        }
        String token = UUID.randomUUID().toString();

        RecuperarSenha entity = new RecuperarSenha();
        entity.setEmail(body.getEmail());
        entity.setToken(token);
        entity.setExpiration(Instant.now().plusSeconds(tokenMinutes * 60L));
        entity = recuperarSenhaRepository.save(entity);

        String text = "Acesse o link para definir uma nova senha\n\n"
                + recoverUri + token + ". Validade de " + tokenMinutes + " minutos";
        emailService.sendEmail(body.getEmail(), "Recuperaçao de Senha", text);
    }
    @Transactional
    public void salvarNovaSenha(NovaSenhaDTO body) {
        List<RecuperarSenha> result = recuperarSenhaRepository.pesquisarTokensValidos(body.getToken(), Instant.now());
        if(result.size() == 0){
            throw new ObjectNotFound("Token invalido");
        }

        Usuario usuario = usuarioRepository.findByEmail(result.get(0).getEmail());
        usuario.setSenha(passwordEncoder.encode(body.getPassword()));
        usuario = usuarioRepository.save(usuario);
    }

    protected Usuario usuarioAutenticado() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Jwt jwtPrincipal = (Jwt) authentication.getPrincipal();
            String username = jwtPrincipal.getClaim("username");
            return usuarioRepository.findByEmail(username);
        }
        catch (Exception e) {
            throw new UsernameNotFoundException("Invalid user");
        }
    }

}
