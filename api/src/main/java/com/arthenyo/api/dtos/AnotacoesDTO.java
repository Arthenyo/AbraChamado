package com.arthenyo.api.dtos;

import com.arthenyo.api.entities.Anotacoes;

public class AnotacoesDTO {
    private Long id;
    private String anotacao;
    private String autor;

    public AnotacoesDTO(Long id, String anotacao, String autor) {
        this.id = id;
        this.anotacao = anotacao;
        this.autor = autor;
    }
    public AnotacoesDTO(Anotacoes entity) {
        id = entity.getId();
        anotacao = entity.getAnotacao();
        autor = entity.getAutor().getNome();
    }

    public Long getId() {
        return id;
    }

    public String getAnotacao() {
        return anotacao;
    }

    public String getAutor() {
        return autor;
    }
}
