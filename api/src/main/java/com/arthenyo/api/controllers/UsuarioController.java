package com.arthenyo.api.controllers;

import com.arthenyo.api.dtos.ChamadoDTO;
import com.arthenyo.api.dtos.UsuarioDTO;
import com.arthenyo.api.entities.Chamado;
import com.arthenyo.api.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/me")
    public ResponseEntity<UsuarioDTO>usuarioLogado(){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.usuarioLogado());
    }
    @PostMapping("/{usuarioId}/favoritar/{chamadoId}")
    public ResponseEntity<Void> favoritarChamado(@PathVariable Long usuarioId, @PathVariable Long chamadoId) {
        usuarioService.favoritarOuDesfavoritarChamado(usuarioId, chamadoId);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/{usuarioId}/favoritos")
    public ResponseEntity<List<ChamadoDTO>> getChamadosFavoritos(@PathVariable Long usuarioId) {
        List<ChamadoDTO> favoritos = usuarioService.getChamadosFavoritos(usuarioId);
        return ResponseEntity.ok(favoritos);
    }
    @PostMapping
    public ResponseEntity<UsuarioDTO> salvarUsuario(@RequestBody UsuarioDTO dto){
        dto = usuarioService.salvarUsuario(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}")
                .buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO>atualizarUsuario(@PathVariable Long id ,@RequestBody UsuarioDTO dto){
        dto = usuarioService.atualizarUsuario(id,dto);
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>deletarUsuario(@PathVariable Long id){
        usuarioService.delatarUsuario(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
