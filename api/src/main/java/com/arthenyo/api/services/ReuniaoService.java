package com.arthenyo.api.services;

import com.arthenyo.api.dtos.ReuniaoDTO;
import com.arthenyo.api.entities.Reuniao;
import com.arthenyo.api.entities.Usuario;
import com.arthenyo.api.repositories.ReuniaoRepository;
import com.arthenyo.api.repositories.UsuarioRepository;
import com.arthenyo.api.services.exception.DateBaseException;
import com.arthenyo.api.services.exception.ObjectNotFound;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReuniaoService {
    @Autowired
    private ReuniaoRepository reuniaoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional(readOnly = true)
    public List<ReuniaoDTO> buscarTodasReunioes() {
        List<Reuniao> reunioes = reuniaoRepository.findAll();
        return reunioes.stream().map(ReuniaoDTO::new).collect(Collectors.toList());
    }

    public ReuniaoDTO salvarReuniao(ReuniaoDTO dto){
        Reuniao entity = new Reuniao();
        criarReuniao(entity,dto);
        entity = reuniaoRepository.save(entity);
        return new ReuniaoDTO(entity);
    }
    @Transactional
    public ReuniaoDTO atualizarReuniao(Long id, ReuniaoDTO userDTO){
        try {
            Reuniao entity = reuniaoRepository.getReferenceById(id);
            criarReuniao(entity,userDTO);
            entity = reuniaoRepository.save(entity);
            return new ReuniaoDTO(entity);
        }catch (EntityNotFoundException e){
            throw new ObjectNotFound("Reuniao nao encontrada " + id);
        }
    }
    @Transactional
    public void deletarReuniao(Long id){
        if(!reuniaoRepository.existsById(id)){
            throw new ObjectNotFound("Reuniao nao encontrada " + id);
        }
        try {
            reuniaoRepository.deleteById(id);
        }catch (DataIntegrityViolationException e){
            throw new DateBaseException("Não foi possivel deletar o Reuniao %d, erro de integridade " + id);
        }
    }

    private void criarReuniao(Reuniao entity, ReuniaoDTO dto) {
        entity.setTitulo(dto.getTitulo());
        entity.setDescricao(dto.getDescricao());
        entity.setDataReuniao(dto.getDataReuniao());
        entity.setLink(dto.getLink());
        for(String part : dto.getParticipantes()){
            Usuario usuario = usuarioRepository.findByNome(part);
            if(usuario!= null){
                entity.getParticipantes().add(usuario);
            }
        }
    }
}
