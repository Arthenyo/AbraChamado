package com.arthenyo.api.dtos;

import com.arthenyo.api.entities.Anotacoes;

public class AnotacoesDTO {
    private Long id;
    private String anotacao;
    private String autor;
    private boolean fixo; // Novo campo para indicar se a anotação é fixada

    public AnotacoesDTO() {
    }

    public AnotacoesDTO(Long id, String anotacao, String autor, boolean fixo) {
        this.id = id;
        this.anotacao = anotacao;
        this.autor = autor;
        this.fixo = fixo;
    }

    public AnotacoesDTO(Anotacoes entity) {
        this.id = entity.getId();
        this.anotacao = entity.getAnotacao();
        this.autor = entity.getAutor().getNome();
        this.fixo = entity.isFixo();
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

    public boolean isFixo() {
        return fixo;
    }
}
