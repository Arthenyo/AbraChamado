package com.arthenyo.api.services;

import com.arthenyo.api.dtos.ChamadoDTO;
import com.arthenyo.api.entities.Auditoria;
import com.arthenyo.api.entities.Chamado;
import com.arthenyo.api.entities.ChamadoHistorico;
import com.arthenyo.api.entities.Usuario;
import com.arthenyo.api.entities.enums.PrioridadeChamado;
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
    public ChamadoDTO atualizarChamado(Long id, ChamadoDTO chamadoDTO) {
        try {
            // Busca o chamado pelo ID
            Chamado entity = chamadoRepository.getReferenceById(id);

            // Salva o estado atual antes de atualizar
            StatusChamado statusChamadoAnterior = entity.getStatusChamado();
            PrioridadeChamado prioridadeChamadoAnterior = entity.getPrioridadeChamado();

            // Verifica se a descrição mudou, e adiciona ao histórico
            if (chamadoDTO.getDescricao() != null && !chamadoDTO.getDescricao().equals(entity.getDescricao())) {
                ChamadoHistorico historico = new ChamadoHistorico();
                historico.setDescricaoAlteracao(chamadoDTO.getDescricao()); // Descrição atualizada
                historico.setAlteradoPor(chamadoDTO.getAtendente() != null ? chamadoDTO.getAtendente() : "Sistema"); // Assumindo que há um campo atendente no DTO
                historico.setDataAlteracao(Instant.now());
                historico.setStatusChamadoAnterior(statusChamadoAnterior);
                historico.setStatusChamadoNovo(entity.getStatusChamado());
                historico.setPrioridadeAnterior(prioridadeChamadoAnterior);
                historico.setPrioridadeNova(entity.getPrioridadeChamado());

                // Adiciona o histórico ao chamado
                entity.getHistoricoChamado().add(historico);
            }

            // Atualiza a entidade com os dados do DTO (exceto a descrição)
            criarChamado(entity, chamadoDTO);

            // Salva a entidade atualizada
            entity = chamadoRepository.save(entity);

            // Registra a auditoria
            Auditoria auditoria = new Auditoria();
            auditoria.setUsuario(entity.getUsuario().getNome());
            auditoria.setAcao("Atualizou");
            auditoria.setEntidade("Chamado");
            auditoria.setDescricao("Chamado ID " + entity.getId());
            auditoria.setTimestamp(Instant.now());
            auditoriaRepository.save(auditoria);

            return new ChamadoDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new ObjectNotFound("chamado nao encontrado " + id);
        }
    }
    @Transactional
    public ChamadoDTO assumirChamado(Long chamadoId, String atendenteNome) {
        try {
            // Buscar o chamado pelo ID
            Chamado chamado = chamadoRepository.getReferenceById(chamadoId);

            // Buscar o atendente pelo nome
            Usuario atendente = usuarioRepository.findByNome(atendenteNome);
            if (atendente == null) {
                throw new ObjectNotFound("Usuario atendente nao encontrado: " + atendenteNome);
            }

            // Atribuir o atendente ao chamado
            chamado.setAtendente(atendente);
            chamado.setStatusChamado(StatusChamado.EM_ANDAMENTO);

            // Criar um registro de histórico para o chamado
            ChamadoHistorico historico = new ChamadoHistorico();
            historico.setDescricaoAlteracao("Atendente assumiu o chamado");
            historico.setAlteradoPor(atendente.getNome()); // Registrando o atendente que assumiu
            historico.setDataAlteracao(Instant.now());
            historico.setStatusChamadoAnterior(StatusChamado.ABERTO);
            historico.setStatusChamadoNovo(StatusChamado.EM_ANDAMENTO);
            historico.setPrioridadeAnterior(chamado.getPrioridadeChamado());
            historico.setPrioridadeNova(chamado.getPrioridadeChamado());

            // Adicionar o histórico ao chamado
            chamado.getHistoricoChamado().add(historico);

            // Salvar as alterações
            chamado = chamadoRepository.save(chamado);

            // Retornar o ChamadoDTO atualizado
            return new ChamadoDTO(chamado);
        } catch (EntityNotFoundException e) {
            throw new ObjectNotFound("Chamado nao encontrado: " + chamadoId);
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

        // Não atualizar a descrição do chamado, pois a descrição inicial deve ser preservada
        // A descrição é registrada apenas no momento da criação do chamado
        if (entity.getDescricao() == null) {
            entity.setDescricao(dto.getDescricao());
        }

        // Atualizar o status do chamado de acordo com o valor do DTO
        if (dto.getStatusChamado() != null) {
            entity.setStatusChamado(dto.getStatusChamado());

            // Definir a data de término se o status for alterado para "FECHADO"
            if (dto.getStatusChamado() == StatusChamado.FECHADO) {
                entity.setTerminoChamado(Instant.now());
            }
        }

        entity.setPrioridadeChamado(dto.getPrioridadeChamado());
        entity.setSetor(dto.getSetor());

        // Buscar e atribuir o usuário responsável pelo chamado
        Usuario usuario = usuarioRepository.findByNome(dto.getUsuario());
        if (usuario == null) {
            throw new ObjectNotFound("Usuario nao encontrado: " + dto.getUsuario());
        }
        entity.setUsuario(usuario);

        // Buscar e atribuir o atendente somente se informado no DTO
        if (dto.getAtendente() != null && !dto.getAtendente().isEmpty()) {
            Usuario atendente = usuarioRepository.findByNome(dto.getAtendente());
            if (atendente == null) {
                throw new ObjectNotFound("Usuario atendente nao encontrado: " + dto.getAtendente());
            }
            entity.setAtendente(atendente);
        }
    }
}
