package com.arthenyo.api.services;

import com.arthenyo.api.dtos.ChamadoDTO;
import com.arthenyo.api.entities.Chamado;
import com.arthenyo.api.entities.enums.StatusChamado;
import com.arthenyo.api.repositories.ChamadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RelatorioService {

    @Autowired
    private ChamadoRepository chamadoRepository;

    // 1. Relatório de Chamados Abertos
    public List<ChamadoDTO> relatorioChamadosAbertos(Instant inicio, Instant fim) {
        List<Chamado> chamados = chamadoRepository.findByStatusChamadoAndCriacaoChamadoBetween(StatusChamado.ABERTO, inicio, fim);
        return chamados.stream().map(ChamadoDTO::new).collect(Collectors.toList());
    }

    // 2. Relatório de Chamados Resolvidos
    public List<ChamadoDTO> relatorioChamadosResolvidos(Instant inicio, Instant fim) {
        List<Chamado> chamados = chamadoRepository.findByStatusChamadoAndCriacaoChamadoBetween(StatusChamado.FECHADO, inicio, fim);
        return chamados.stream().map(ChamadoDTO::new).collect(Collectors.toList());
    }

    // 3. Relatório de Desempenho por Técnico
    public Map<String, Long> relatorioDesempenhoTecnico(Instant inicio, Instant fim) {
        List<Chamado> chamados = chamadoRepository.findByCriacaoChamadoBetween(inicio, fim);
        // Filtra chamados que tenham atendente não nulo para evitar erros
        return chamados.stream()
                .filter(chamado -> chamado.getAtendente() != null)
                .collect(Collectors.groupingBy(chamado -> chamado.getAtendente().getNome(), Collectors.counting()));
    }

    // 4. Relatório de Clientes Ativos
    public List<String> relatorioClientesAtivos(Instant inicio, Instant fim) {
        List<Chamado> chamados = chamadoRepository.findByCriacaoChamadoBetween(inicio, fim);
        return chamados.stream()
                .map(chamado -> chamado.getUsuario() != null ? chamado.getUsuario().getNome() : "Usuário Desconhecido")
                .distinct()
                .collect(Collectors.toList());
    }

    // 5. Relatório de Chamados por Prioridade
    public Map<String, Long> relatorioChamadosPorPrioridade(Instant inicio, Instant fim) {
        List<Chamado> chamados = chamadoRepository.findByCriacaoChamadoBetween(inicio, fim);
        return chamados.stream()
                .filter(chamado -> chamado.getPrioridadeChamado() != null)
                .collect(Collectors.groupingBy(chamado -> chamado.getPrioridadeChamado().name(), Collectors.counting()));
    }

    // 6. Relatório de Chamados por Setor
    public Map<String, Long> relatorioChamadosPorSetor(Instant inicio, Instant fim) {
        List<Chamado> chamados = chamadoRepository.findByCriacaoChamadoBetween(inicio, fim);
        return chamados.stream()
                .filter(chamado -> chamado.getSetor() != null && !chamado.getSetor().isEmpty())
                .collect(Collectors.groupingBy(Chamado::getSetor, Collectors.counting()));
    }
}
