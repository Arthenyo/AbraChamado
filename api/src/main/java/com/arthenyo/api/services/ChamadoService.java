package com.arthenyo.api.services;

import com.arthenyo.api.dtos.ChamadoDTO;
import com.arthenyo.api.entities.Auditoria;
import com.arthenyo.api.entities.Chamado;
import com.arthenyo.api.entities.Usuario;
import com.arthenyo.api.entities.enums.StatusChamado;
import com.arthenyo.api.repositories.AuditoriaRepository;
import com.arthenyo.api.repositories.ChamadoRepository;
import com.arthenyo.api.repositories.UsuarioRepository;
import com.arthenyo.api.services.exception.DateBaseException;
import com.arthenyo.api.services.exception.ObjectNotFound;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ChamadoService {
    @Autowired
    private ChamadoRepository chamadoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private AuditoriaRepository auditoriaRepository;

    public Map<StatusChamado, Long> contarChamadosPorStatus(String data) {
        List<Object[]> resultados = chamadoRepository.countChamadosGroupedByStatus(data);
        Map<StatusChamado, Long> contagemPorStatus = new HashMap<>();

        for (Object[] resultado : resultados) {
            StatusChamado status = (StatusChamado) resultado[0];
            Long contagem = (Long) resultado[1];
            contagemPorStatus.put(status, contagem);
        }

        return contagemPorStatus;
    }
    public Long contarChamadosPorDia(String data) {
        return chamadoRepository.countChamadosByData(data);
    }

    public Page<ChamadoDTO> todosOsChamados(Pageable pageable){
        Page<Chamado> page = chamadoRepository.findAll(pageable);
        return page.map(x -> new ChamadoDTO(x));
    }
    public ChamadoDTO ChamadoId(Long id){
        Chamado chamado = chamadoRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFound("Chamado nao Encontrado"));
        return new ChamadoDTO(chamado);
    }

    public List<Chamado> obterUltimosTresChamados() {
        PageRequest pageable = PageRequest.of(0, 3);
        return chamadoRepository.findTopChamados(pageable);
    }
    public List<ChamadoDTO> buscarChamadosPorTitulo(String titulo) {
        List<Chamado> chamados = chamadoRepository.findByTituloContainingIgnoreCase(titulo);
        return chamados.stream().map(ChamadoDTO::new).collect(Collectors.toList());
    }


    public ChamadoDTO salvarChamado(ChamadoDTO dto){
        Chamado entity = new Chamado();
        criarChamado(entity,dto);
        entity.setStatusChamado(StatusChamado.ABERTO);
        entity.setCriacaoChamado(Instant.now());
        entity = chamadoRepository.save(entity);

        Auditoria auditoria = new Auditoria();
        auditoria.setUsuario(entity.getUsuario().getNome());
        auditoria.setAcao("Criou");
        auditoria.setEntidade("Chamado");
        auditoria.setDescricao("Chamado ID " + entity.getId());
        auditoria.setTimestamp(Instant.now());
        auditoriaRepository.save(auditoria);

        return new ChamadoDTO(entity);
    }
    @Transactional
    public ChamadoDTO atualizarChamado(Long id, ChamadoDTO userDTO){
        try {
            Chamado entity = chamadoRepository.getReferenceById(id);
            criarChamado(entity,userDTO);
            entity = chamadoRepository.save(entity);

            Auditoria auditoria = new Auditoria();
            auditoria.setUsuario(entity.getUsuario().getNome());
            auditoria.setAcao("Criou");
            auditoria.setEntidade("Chamado");
            auditoria.setDescricao("Chamado ID " + entity.getId());
            auditoria.setTimestamp(Instant.now());
            auditoriaRepository.save(auditoria);

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
        entity.setPrioridadeChamado(dto.getPrioridadeChamado());
        entity.setSetor(dto.getSetor());
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
