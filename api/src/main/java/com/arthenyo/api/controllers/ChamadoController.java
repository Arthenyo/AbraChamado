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

@RestController
@RequestMapping("/chamado")
public class ChamadoController {

    @Autowired
    private ChamadoService chamadoService;

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
