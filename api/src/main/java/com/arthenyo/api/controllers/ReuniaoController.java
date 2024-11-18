package com.arthenyo.api.controllers;

import com.arthenyo.api.dtos.ReuniaoDTO;
import com.arthenyo.api.services.ReuniaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/reuniao")
public class ReuniaoController {

    @Autowired
    private ReuniaoService reuniaoService;
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public ResponseEntity<List<ReuniaoDTO>> buscarTodasReunioes() {
        List<ReuniaoDTO> reunioes = reuniaoService.buscarTodasReunioes();
        return ResponseEntity.ok().body(reunioes);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public ResponseEntity<ReuniaoDTO> salvarReuniao(@RequestBody ReuniaoDTO dto){
        dto = reuniaoService.salvarReuniao(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}")
                .buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public ResponseEntity<ReuniaoDTO>atualizarReuniao(@PathVariable Long id ,@RequestBody ReuniaoDTO dto){
        dto = reuniaoService.atualizarReuniao(id,dto);
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public ResponseEntity<Void>deletarReuniao(@PathVariable Long id){
        reuniaoService.deletarReuniao(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
