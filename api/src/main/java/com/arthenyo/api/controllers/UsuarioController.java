package com.arthenyo.api.controllers;

import com.arthenyo.api.dtos.ChamadoDTO;
import com.arthenyo.api.dtos.UsuarioCreateDTO;
import com.arthenyo.api.dtos.UsuarioDTO;
import com.arthenyo.api.entities.Chamado;
import com.arthenyo.api.entities.enums.TipoUsuario;
import com.arthenyo.api.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    @GetMapping("/tipo/{tipoUsuario}")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public Page<UsuarioDTO> getUsuariosPorTipo(@PathVariable TipoUsuario tipoUsuario, Pageable pageable) {
        return usuarioService.buscarUsuariosPorTipo(tipoUsuario, pageable);
    }
    @GetMapping("/tipo/{tipoUsuario}/todos")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public List<UsuarioDTO> getTodosUsuariosPorTipo(@PathVariable TipoUsuario tipoUsuario) {
        return usuarioService.buscarTodosUsuariosPorTipo(tipoUsuario);
    }

    @GetMapping("/buscarPorNome")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public ResponseEntity<List<UsuarioDTO>> buscarClientesPorNome(@RequestParam String nome) {
        List<UsuarioDTO> clientes = usuarioService.buscarClientesPorNome(nome);
        return ResponseEntity.ok().body(clientes);
    }
    @GetMapping("/buscarAtendentesPorNome")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public ResponseEntity<List<UsuarioDTO>> buscarAtendentesPorNome(@RequestParam String nome) {
        List<UsuarioDTO> atendentes = usuarioService.buscarAtendentesPorNome(nome);
        return ResponseEntity.ok().body(atendentes);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public ResponseEntity<UsuarioDTO> criarUsuario(@RequestBody UsuarioCreateDTO usuarioCreateDTO) {
        UsuarioDTO usuarioCriado = usuarioService.salvarUsuario(usuarioCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioCriado);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public ResponseEntity<UsuarioDTO>atualizarUsuario(@PathVariable Long id ,@RequestBody UsuarioCreateDTO dto){
        UsuarioDTO atualizarUsuario = usuarioService.atualizarUsuario(id,dto);
        return ResponseEntity.ok().body(atualizarUsuario);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public ResponseEntity<Void>deletarUsuario(@PathVariable Long id){
        usuarioService.delatarUsuario(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
