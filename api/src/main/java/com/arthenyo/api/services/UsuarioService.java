package com.arthenyo.api.services;

import com.arthenyo.api.dtos.AcessoDTO;
import com.arthenyo.api.dtos.ChamadoDTO;
import com.arthenyo.api.dtos.UsuarioCreateDTO;
import com.arthenyo.api.dtos.UsuarioDTO;
import com.arthenyo.api.entities.Acesso;
import com.arthenyo.api.entities.Auditoria;
import com.arthenyo.api.entities.Chamado;
import com.arthenyo.api.entities.Usuario;
import com.arthenyo.api.entities.enums.TipoUsuario;
import com.arthenyo.api.projections.UsuarioDetalhesProjection;
import com.arthenyo.api.repositories.AcessoRepository;
import com.arthenyo.api.repositories.AuditoriaRepository;
import com.arthenyo.api.repositories.ChamadoRepository;
import com.arthenyo.api.repositories.UsuarioRepository;
import com.arthenyo.api.services.exception.DateBaseException;
import com.arthenyo.api.services.exception.ObjectNotFound;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService implements UserDetailsService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AutenticacaoService autenticacaoService;
    @Autowired
    private ChamadoRepository chamadoRepository;
    @Autowired
    private AuditoriaRepository auditoriaRepository;
    @Autowired
    private AcessoRepository acessoRepository;

    @Transactional(readOnly = true)
    public UsuarioDTO usuarioLogado(){
        Usuario usuario = autenticacaoService.usuarioAutenticado();
        return new UsuarioDTO(usuario);
    }

    public Page<UsuarioDTO> buscarUsuariosPorTipo(TipoUsuario tipoUsuario, Pageable pageable) {
        Page<Usuario> usuarios = usuarioRepository.findByTipoUsuario(tipoUsuario, pageable);

        Page<UsuarioDTO> usuarioDTOs = new PageImpl<>(
                usuarios.getContent().stream().map(UsuarioDTO::new).collect(Collectors.toList()),
                pageable,
                usuarios.getTotalElements()
        );

        return usuarioDTOs;
    }
    public List<UsuarioDTO> buscarTodosUsuariosPorTipo(TipoUsuario tipoUsuario) {
        List<Usuario> usuarios = usuarioRepository.findByTipoUsuario(tipoUsuario);
        return usuarios.stream().map(UsuarioDTO::new).collect(Collectors.toList());
    }

    public List<UsuarioDTO> buscarClientesPorNome(String nome) {
        List<Usuario> usuarios = usuarioRepository.findByNomeContainingIgnoreCaseAndTipoUsuario(nome, TipoUsuario.CLIENTE);
        return usuarios.stream().map(UsuarioDTO::new).collect(Collectors.toList());
    }

    public List<UsuarioDTO> buscarAtendentesPorNome(String nome) {
        List<Usuario> usuarios = usuarioRepository.findByNomeContainingIgnoreCaseAndTipoUsuario(nome, TipoUsuario.ATENDENTE);
        return usuarios.stream().map(UsuarioDTO::new).collect(Collectors.toList());
    }

    public UsuarioDTO salvarUsuario(UsuarioCreateDTO dto){
        Usuario entity = new Usuario();
        criarUsuario(entity, dto);
        entity.setSenha(passwordEncoder.encode(dto.getSenha()));
        if(entity.getTipoUsuario() == TipoUsuario.CLIENTE){
            Acesso acesso = acessoRepository.findByNome("ROLE_CLIENTE");
            entity.getAcessos().add(acesso);
        }else {
            Acesso acesso = acessoRepository.findByNome("ROLE_SUPORTE");
            entity.getAcessos().add(acesso);
        }

        entity = usuarioRepository.save(entity);

        Auditoria auditoria = new Auditoria();
        auditoria.setUsuario(entity.getNome());
        auditoria.setAcao("Criou");
        if(entity.getTipoUsuario() == TipoUsuario.CLIENTE){
            auditoria.setEntidade("Cliente");
            auditoria.setDescricao("Cliente ID " + entity.getId());
            auditoria.setTimestamp(Instant.now());
        }else {
            auditoria.setEntidade("Suporte");
            auditoria.setDescricao("Suporte ID " + entity.getId());
            auditoria.setTimestamp(Instant.now());
        }
        auditoriaRepository.save(auditoria);

        return new UsuarioDTO(entity);
    }
    @Transactional
    public UsuarioDTO atualizarUsuario(Long id, UsuarioCreateDTO userDTO){
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

    private void criarUsuario(Usuario entity, UsuarioCreateDTO dto) {
        entity.setNome(dto.getNome());
        entity.setEmail(dto.getEmail());
        entity.setTipoUsuario(dto.getTipoUsuario());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<UsuarioDetalhesProjection> result = usuarioRepository.searchUserAndRolesByEmail(username);
        if(result.isEmpty()){
            throw new UsernameNotFoundException("Usuario nao encontrado");
        }
        Usuario usuario = new Usuario();
        usuario.setEmail(username);
        usuario.setSenha(result.get(0).getPassword());

        for (UsuarioDetalhesProjection projection : result) {
            if (projection.getAuthority() != null) {
                usuario.addAcesso(new Acesso(projection.getRoleId(), projection.getAuthority()));
            }
        }
        return usuario;
    }

}
