package com.arthenyo.api.dtos;

import com.arthenyo.api.entities.Chamado;
import com.arthenyo.api.entities.Usuario;
import com.arthenyo.api.entities.enums.TipoUsuario;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class UsuarioDTO {
    private Long id;
    private String nome;
    private String email;
    private TipoUsuario tipoUsuario;
    private List<AcessoDTO> acessos = new ArrayList<>();

    public UsuarioDTO(Long id, String nome, String email, TipoUsuario tipoUsuario) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.tipoUsuario = tipoUsuario;
    }

    public UsuarioDTO(Usuario entity) {
        id = entity.getId();
        nome = entity.getNome();
        email = entity.getEmail();
        tipoUsuario = entity.getTipoUsuario();
        entity.getAcessos().forEach(acesso -> this.acessos.add(new AcessoDTO(acesso)));
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

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    public List<AcessoDTO> getAcessos() {
        return acessos;
    }
}
