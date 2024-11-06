package com.arthenyo.api.controllers;

import com.arthenyo.api.dtos.ChamadoDTO;
import com.arthenyo.api.dtos.UsuarioDTO;
import com.arthenyo.api.services.ChamadoService;
import com.arthenyo.api.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/chamado")
public class ChamadoController {

    @Autowired
    private ChamadoService chamadoService;
    @GetMapping("/total")
    public ResponseEntity<Long> getTotalChamados() {
        long totalChamados = chamadoService.getTotalChamados();
        return ResponseEntity.ok().body(totalChamados);
    }

    @GetMapping("/total-abertos")
    public ResponseEntity<Long> getTotalChamadosAbertos() {
        long totalChamadosAbertos = chamadoService.getTotalChamadosAbertos();
        return ResponseEntity.ok().body(totalChamadosAbertos);
    }

    @GetMapping("/total-fechados")
    public ResponseEntity<Long> getTotalChamadosFinalizados() {
        long totalChamadosFinalizados = chamadoService.getTotalChamadosFinalizados();
        return ResponseEntity.ok().body(totalChamadosFinalizados);
    }
    @GetMapping("/top5-abertos")
    public ResponseEntity<List<ChamadoDTO>> getTop5ChamadosAbertos() {
        List<ChamadoDTO> top5ChamadosAbertos = chamadoService.getTop5ChamadosAbertos();
        return ResponseEntity.ok().body(top5ChamadosAbertos);
    }
    @PostMapping
    public ResponseEntity<ChamadoDTO> salvarChamado(@RequestBody ChamadoDTO dto){
        dto = chamadoService.salvarChamado(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}")
                .buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ChamadoDTO>atualizarChamado(@PathVariable Long id ,@RequestBody ChamadoDTO dto){
        dto = chamadoService.atualizarChamado(id,dto);
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>deletarChamado(@PathVariable Long id){
        chamadoService.deletarChamado(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
