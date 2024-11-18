package com.arthenyo.api.dtos;

import com.arthenyo.api.entities.enums.TipoUsuario;

import java.util.ArrayList;
import java.util.List;

public class UsuarioCreateDTO {
    private String nome;
    private String email;
    private String senha;
    private TipoUsuario tipoUsuario;
    private List<AcessoDTO> acessos = new ArrayList<>();

    // Getters e setters
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public List<AcessoDTO> getAcessos() {
        return acessos;
    }

    public void setAcessos(List<AcessoDTO> acessos) {
        this.acessos = acessos;
    }
}
