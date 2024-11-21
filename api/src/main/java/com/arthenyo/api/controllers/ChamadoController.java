package com.arthenyo.api.controllers;

import com.arthenyo.api.dtos.ChamadoDTO;
import com.arthenyo.api.entities.Chamado;
import com.arthenyo.api.entities.enums.StatusChamado;
import com.arthenyo.api.services.ChamadoService;
import com.arthenyo.api.services.exception.ObjectNotFound;
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
import java.util.Map;

@RestController
@RequestMapping("/chamado")
public class ChamadoController {

    @Autowired
    private ChamadoService chamadoService;

    @GetMapping("/ContarChamadosStatus")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public Map<StatusChamado, Long> contarChamadosPorStatus(@RequestParam("data") String data) {
        return chamadoService.contarChamadosPorStatus(data.trim());
    }
    @GetMapping("/contarChamados")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public Long contarChamadosPorDia(@RequestParam("data") String data) {
        return chamadoService.contarChamadosPorDia(data.trim());
    }

    @GetMapping("/ultimosTres")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public List<Chamado> obterUltimosTresChamados() {
        return chamadoService.obterUltimosTresChamados();
    }

    @GetMapping("/todosChamados")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public ResponseEntity<Page<ChamadoDTO>> todosChamados(Pageable pageable) {
        Page<ChamadoDTO> page = chamadoService.todosOsChamados(pageable);
        return ResponseEntity.ok().body(page);
    }

    @GetMapping("/todosChamados/{id}")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public ResponseEntity<ChamadoDTO> buscarChamadoPorId(@PathVariable Long id) {
        ChamadoDTO chamadoDTO = chamadoService.ChamadoId(id);
        return ResponseEntity.ok().body(chamadoDTO);
    }
    @GetMapping("/buscarPorTitulo")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public ResponseEntity<List<ChamadoDTO>> buscarChamadosPorTitulo(@RequestParam String titulo) {
        List<ChamadoDTO> chamados = chamadoService.buscarChamadosPorTitulo(titulo);
        return ResponseEntity.ok().body(chamados);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public ResponseEntity<ChamadoDTO> salvarChamado(@RequestBody ChamadoDTO dto){
        dto = chamadoService.salvarChamado(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}")
                .buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public ResponseEntity<ChamadoDTO> atualizarChamado(@PathVariable Long id, @RequestBody ChamadoDTO dto) {
        try {
            dto = chamadoService.atualizarChamado(id, dto);
            return ResponseEntity.ok().body(dto);
        } catch (ObjectNotFound e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    @PutMapping("/{id}/assumir")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public ResponseEntity<ChamadoDTO> assumirChamado(@PathVariable Long id, @RequestParam String atendenteNome) {
        ChamadoDTO dto = chamadoService.assumirChamado(id, atendenteNome);
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SUPORTE')")
    public ResponseEntity<Void>deletarChamado(@PathVariable Long id){
        chamadoService.deletarChamado(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
