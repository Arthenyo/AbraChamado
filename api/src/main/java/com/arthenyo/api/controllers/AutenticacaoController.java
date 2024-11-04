package com.arthenyo.api.controllers;

import com.arthenyo.api.dtos.EmailDTO;
import com.arthenyo.api.dtos.NovaSenhaDTO;
import com.arthenyo.api.services.AutenticacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/oauth2")
public class AutenticacaoController {

    @Autowired
    private AutenticacaoService service;

    @PostMapping(value = "/recover-token")
    public ResponseEntity<Void>createdRecoverToken(@RequestBody EmailDTO body){
        service.criarTokenRecuperação(body);
        return ResponseEntity.noContent().build();
    }
    @PutMapping(value = "/new-password")
    public ResponseEntity<Void>saveNewPassword(@RequestBody NovaSenhaDTO body){
        service.salvarNovaSenha(body);
        return ResponseEntity.noContent().build();
    }
}
