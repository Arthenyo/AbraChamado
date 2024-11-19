package com.arthenyo.api.controllers;

import com.arthenyo.api.dtos.ChamadoDTO;
import com.arthenyo.api.services.RelatorioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/relatorios")
public class RelatorioController {

    @Autowired
    private RelatorioService relatorioService;

    // 1. Relatório de Chamados Abertos
    @GetMapping("/chamados-abertos")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public ResponseEntity<List<ChamadoDTO>> relatorioChamadosAbertos(
            @RequestParam("inicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant inicio,
            @RequestParam("fim") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant fim) {
        List<ChamadoDTO> relatorio = relatorioService.relatorioChamadosAbertos(inicio, fim);
        return ResponseEntity.ok().body(relatorio);
    }

    // 2. Relatório de Chamados Resolvidos
    @GetMapping("/chamados-resolvidos")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public ResponseEntity<List<ChamadoDTO>> relatorioChamadosResolvidos(
            @RequestParam("inicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant inicio,
            @RequestParam("fim") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant fim) {
        List<ChamadoDTO> relatorio = relatorioService.relatorioChamadosResolvidos(inicio, fim);
        return ResponseEntity.ok().body(relatorio);
    }

    // 3. Relatório de Desempenho por Técnico
    @GetMapping("/desempenho-tecnico")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public ResponseEntity<Map<String, Long>> relatorioDesempenhoTecnico(
            @RequestParam("inicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant inicio,
            @RequestParam("fim") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant fim) {
        Map<String, Long> relatorio = relatorioService.relatorioDesempenhoTecnico(inicio, fim);
        return ResponseEntity.ok().body(relatorio);
    }

    // 4. Relatório de Clientes Ativos
    @GetMapping("/clientes-ativos")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public ResponseEntity<List<String>> relatorioClientesAtivos(
            @RequestParam("inicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant inicio,
            @RequestParam("fim") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant fim) {
        List<String> relatorio = relatorioService.relatorioClientesAtivos(inicio, fim);
        return ResponseEntity.ok().body(relatorio);
    }

    // 5. Relatório de Chamados por Prioridade
    @GetMapping("/chamados-por-prioridade")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public ResponseEntity<Map<String, Long>> relatorioChamadosPorPrioridade(
            @RequestParam("inicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant inicio,
            @RequestParam("fim") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant fim) {
        Map<String, Long> relatorio = relatorioService.relatorioChamadosPorPrioridade(inicio, fim);
        return ResponseEntity.ok().body(relatorio);
    }

    // 6. Relatório de Chamados por Setor
    @GetMapping("/chamados-por-setor")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public ResponseEntity<Map<String, Long>> relatorioChamadosPorSetor(
            @RequestParam("inicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant inicio,
            @RequestParam("fim") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant fim) {
        Map<String, Long> relatorio = relatorioService.relatorioChamadosPorSetor(inicio, fim);
        return ResponseEntity.ok().body(relatorio);
    }
}
