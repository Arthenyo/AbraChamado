package com.arthenyo.api.controllers;

import com.arthenyo.api.entities.Auditoria;
import com.arthenyo.api.repositories.AuditoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@RestController
@RequestMapping("/auditoria")
public class AuditoriaController {

    @Autowired
    private AuditoriaRepository auditoriaRepository;

    @GetMapping("/recentes")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public List<Auditoria> obterAuditoriasRecentes() {
        return auditoriaRepository.findTop3ByOrderByTimestampDesc();
    }

}

