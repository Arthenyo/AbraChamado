package com.arthenyo.api.services;

import com.arthenyo.api.dtos.AcessoDTO;
import com.arthenyo.api.dtos.UsuarioDTO;
import com.arthenyo.api.entities.Acesso;
import com.arthenyo.api.entities.Usuario;
import com.arthenyo.api.projections.UsuarioDetalhesProjection;
import com.arthenyo.api.repositories.UsuarioRepository;
import com.arthenyo.api.services.exception.DateBaseException;
import com.arthenyo.api.services.exception.ObjectNotFound;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UsuarioService implements UserDetailsService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UsuarioDTO salvarUsuario(UsuarioDTO dto){
        Usuario entity = new Usuario();
        criarUsuario(entity,dto);
        entity.setSenha(passwordEncoder.encode(dto.getSenha()));
        entity = usuarioRepository.save(entity);
        return new UsuarioDTO(entity);
    }
    @Transactional
    public UsuarioDTO atualizarUsuario(Long id, UsuarioDTO userDTO){
        try {
            Usuario entity = usuarioRepository.getReferenceById(id);
            criarUsuario(entity,userDTO);
            entity = usuarioRepository.save(entity);
            return new UsuarioDTO(entity);
        }catch (EntityNotFoundException e){
            throw new ObjectNotFound("Usuario nao encontrada " + id);
        }
    }
    @Transactional
    public void delatarUsuario(Long id){
        if(!usuarioRepository.existsById(id)){
            throw new ObjectNotFound("Usuario nao encontrada " + id);
        }
        try {
            usuarioRepository.deleteById(id);
        }catch (DataIntegrityViolationException e){
            throw new DateBaseException("Não foi possivel deletar o Usuario %d, erro de integridade " + id);
        }
    }

    private void criarUsuario(Usuario entity, UsuarioDTO dto) {
        entity.setNome(dto.getNome());
        entity.setEmail(dto.getEmail());
        for(AcessoDTO acessoDTO : dto.getAcessos()){
            Acesso acesso = new Acesso();
            acesso.setId(acessoDTO.getId());
            entity.getAcessos().add(acesso);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<UsuarioDetalhesProjection> result = usuarioRepository.searchUserAndRolesByEmail(username);
        if(result.size() == 0){
            throw new UsernameNotFoundException("Usuario nao encontrado");
        }
        Usuario usuario = new Usuario();
        usuario.setEmail(username);
        usuario.setSenha(result.get(0).getPassword());
        for(UsuarioDetalhesProjection projection : result){
            usuario.addAcesso(new Acesso(projection.getRoleId(),projection.getAuthority()));
        }
        return usuario;
    }
}
