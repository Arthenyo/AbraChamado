package com.arthenyo.api.dtos;

import com.arthenyo.api.entities.Acesso;

public class AcessoDTO {
    private Long id;
    private String nome;

    public AcessoDTO(Long id, String nome) {
        this.id = id;
        this.nome = nome;
    }
    public AcessoDTO(Acesso entity) {
        id = entity.getId();
        nome = entity.getNome();
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }
}
