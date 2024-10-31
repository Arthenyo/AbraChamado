package com.arthenyo.api.services;

import com.arthenyo.api.dtos.ChamadoDTO;
import com.arthenyo.api.entities.Chamado;
import com.arthenyo.api.entities.Usuario;
import com.arthenyo.api.entities.enums.StatusChamado;
import com.arthenyo.api.repositories.ChamadoRepository;
import com.arthenyo.api.repositories.UsuarioRepository;
import com.arthenyo.api.services.exception.DateBaseException;
import com.arthenyo.api.services.exception.ObjectNotFound;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
public class ChamadoService {
    @Autowired
    private ChamadoRepository chamadoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public ChamadoDTO salvarChamado(ChamadoDTO dto){
        Chamado entity = new Chamado();
        criarChamado(entity,dto);
        entity.setStatusChamado(StatusChamado.ABERTO);
        entity.setCriacaoChamado(Instant.now());
        entity = chamadoRepository.save(entity);
        return new ChamadoDTO(entity);
    }
    @Transactional
    public ChamadoDTO atualizarChamado(Long id, ChamadoDTO userDTO){
        try {
            Chamado entity = chamadoRepository.getReferenceById(id);
            criarChamado(entity,userDTO);
            entity = chamadoRepository.save(entity);
            return new ChamadoDTO(entity);
        }catch (EntityNotFoundException e){
            throw new ObjectNotFound("chamado nao encontrada " + id);
        }
    }
    @Transactional
    public void deletarChamado(Long id){
        if(!chamadoRepository.existsById(id)){
            throw new ObjectNotFound("Chamado nao encontrada " + id);
        }
        try {
            chamadoRepository.deleteById(id);
        }catch (DataIntegrityViolationException e){
            throw new DateBaseException("Não foi possivel deletar o Chamado %d, erro de integridade " + id);
        }
    }

    private void criarChamado(Chamado entity, ChamadoDTO dto) {
        entity.setTitulo(dto.getTitulo());
        entity.setDescricao(dto.getDescricao());
        if(dto.getStatusChamado() == StatusChamado.FECHADO){
            entity.setTerminoChamado(Instant.now());
        }
        Usuario usuario = usuarioRepository.findByNome(dto.getUsuario());
        if(usuario == null){
            throw new ObjectNotFound("Usuario nao encontrado " + dto.getUsuario());
        }
        entity.setUsuario(usuario);
        Usuario atendente = usuarioRepository.findByNome(dto.getAtendente());
        if(atendente == null){
            throw new ObjectNotFound("Usuario atendente nao encontrado " + dto.getAtendente());
        }
        entity.setAtendente(atendente);
    }
}
