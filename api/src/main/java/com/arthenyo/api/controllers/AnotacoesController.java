package com.arthenyo.api.controllers;

import com.arthenyo.api.dtos.AnotacoesDTO;
import com.arthenyo.api.services.AnotacoesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/anotacoes")
public class AnotacoesController {

    @Autowired
    private AnotacoesService anotacoesService;
    @GetMapping("/ultimas")
    public ResponseEntity<List<AnotacoesDTO>> buscarUltimas5Anotacoes() {
        List<AnotacoesDTO> anotacoes = anotacoesService.buscarUltimas5Anotacoes();
        return ResponseEntity.ok().body(anotacoes);
    }
    @PostMapping
    public ResponseEntity<AnotacoesDTO> salvarAnotacoes(@RequestBody AnotacoesDTO dto){
        dto = anotacoesService.salvarAnotacoes(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}")
                .buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnotacoesDTO>atualizarAnotacoes(@PathVariable Long id ,@RequestBody AnotacoesDTO dto){
        dto = anotacoesService.atualizarAnotacoes(id,dto);
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>deletarAnotacoes(@PathVariable Long id){
        anotacoesService.deletarAnotacoes(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
