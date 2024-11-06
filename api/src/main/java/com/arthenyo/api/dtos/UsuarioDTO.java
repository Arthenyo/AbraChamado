package com.arthenyo.api.dtos;

import com.arthenyo.api.entities.Chamado;
import com.arthenyo.api.entities.Usuario;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class UsuarioDTO {
    private Long id;
    private String nome;
    private String email;
    private String senha;
    private List<AcessoDTO> acessos = new ArrayList<>();
    private List<Long> chamadosFavoritos;

    public UsuarioDTO(Long id, String nome, String email, String senha, List<Long> chamadosFavoritos) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.chamadosFavoritos = chamadosFavoritos;
    }

    public UsuarioDTO(Usuario entity) {
        id = entity.getId();
        nome = entity.getNome();
        email = entity.getEmail();
        senha = entity.getSenha();
        entity.getAcessos().forEach(acesso -> this.acessos.add(new AcessoDTO(acesso)));
        chamadosFavoritos = entity.getChamadosFavoritos().stream().map(Chamado::getId).collect(Collectors.toList());
    }
    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }
    @JsonIgnore
    public String getSenha() {
        return senha;
    }

    public List<AcessoDTO> getAcessos() {
        return acessos;
    }
}
