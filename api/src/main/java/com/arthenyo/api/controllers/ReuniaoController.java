package com.arthenyo.api.controllers;

import com.arthenyo.api.dtos.ReuniaoDTO;
import com.arthenyo.api.services.ReuniaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/reuniao")
public class ReuniaoController {

    @Autowired
    private ReuniaoService reuniaoService;

    @PostMapping
    public ResponseEntity<ReuniaoDTO> salvarReuniao(@RequestBody ReuniaoDTO dto){
        dto = reuniaoService.salvarReuniao(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}")
                .buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReuniaoDTO>atualizarReuniao(@PathVariable Long id ,@RequestBody ReuniaoDTO dto){
        dto = reuniaoService.atualizarReuniao(id,dto);
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>deletarReuniao(@PathVariable Long id){
        reuniaoService.deletarReuniao(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
