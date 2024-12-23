package com.arthenyo.api.services;

import com.arthenyo.api.dtos.AnotacoesDTO;
import com.arthenyo.api.dtos.ReuniaoDTO;
import com.arthenyo.api.entities.Anotacoes;
import com.arthenyo.api.entities.Auditoria;
import com.arthenyo.api.entities.Reuniao;
import com.arthenyo.api.entities.Usuario;
import com.arthenyo.api.repositories.AnotacoesRepository;
import com.arthenyo.api.repositories.AuditoriaRepository;
import com.arthenyo.api.repositories.ReuniaoRepository;
import com.arthenyo.api.repositories.UsuarioRepository;
import com.arthenyo.api.services.exception.DateBaseException;
import com.arthenyo.api.services.exception.ObjectNotFound;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnotacoesService {
    @Autowired
    private AnotacoesRepository anotacoesRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private AuditoriaRepository auditoriaRepository;
    @Transactional(readOnly = true)
    public List<AnotacoesDTO> buscarTodasAnotacoes() {
        List<Anotacoes> anotacoes = anotacoesRepository.findAll();
        return anotacoes.stream().map(AnotacoesDTO::new).collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public List<AnotacoesDTO> buscarAnotacoesPorTexto(String texto) {
        List<Anotacoes> anotacoes = anotacoesRepository.buscarPorTexto(texto);
        return anotacoes.stream().map(AnotacoesDTO::new).collect(Collectors.toList());
    }

    public AnotacoesDTO salvarAnotacoes(AnotacoesDTO dto){
        Anotacoes entity = new Anotacoes();
        criarAnotacoes(entity,dto);
        entity = anotacoesRepository.save(entity);
        Auditoria auditoria = new Auditoria();
        auditoria.setUsuario(entity.getAutor().getNome());
        auditoria.setAcao("Criou");
        auditoria.setEntidade("Anotação");
        auditoria.setDescricao("Anotação ID " + entity.getId());
        auditoria.setTimestamp(Instant.now());
        auditoriaRepository.save(auditoria);
        return new AnotacoesDTO(entity);
    }
    @Transactional
    public AnotacoesDTO atualizarAnotacoes(Long id, AnotacoesDTO userDTO){
        try {
            Anotacoes entity = anotacoesRepository.getReferenceById(id);
            criarAnotacoes(entity,userDTO);
            entity = anotacoesRepository.save(entity);

            Auditoria auditoria = new Auditoria();
            auditoria.setUsuario(entity.getAutor().getNome());
            auditoria.setAcao("Atualizou");
            auditoria.setEntidade("Anotação");
            auditoria.setDescricao("Anotação ID " + entity.getId());
            auditoria.setTimestamp(Instant.now());
            auditoriaRepository.save(auditoria);

            return new AnotacoesDTO(entity);
        }catch (EntityNotFoundException e){
            throw new ObjectNotFound("Anotacoes nao encontrada " + id);
        }
    }
    @Transactional
    public void deletarAnotacoes(Long id){
        if(!anotacoesRepository.existsById(id)){
            throw new ObjectNotFound("Anotacoes nao encontrada " + id);
        }
        try {
            anotacoesRepository.deleteById(id);
        }catch (DataIntegrityViolationException e){
            throw new DateBaseException("Não foi possivel deletar o Anotacoes %d, erro de integridade " + id);
        }
    }

    private void criarAnotacoes(Anotacoes entity, AnotacoesDTO dto) {
        entity.setAnotacao(dto.getAnotacao());
        Usuario usuario = usuarioRepository.findByNome(dto.getAutor());
        if(usuario == null){
            throw new ObjectNotFound("Anotacoes nao encontrado " + dto.getAutor());
        }
        entity.setAutor(usuario);
    }
}
