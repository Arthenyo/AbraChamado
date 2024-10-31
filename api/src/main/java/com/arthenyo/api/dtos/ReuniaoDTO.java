package com.arthenyo.api.dtos;

import com.arthenyo.api.entities.Reuniao;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ReuniaoDTO {
    private Long id;
    private String titulo;
    private String descricao;
    private LocalDate dataReuniao;
    private String link;
    private List<String> participantes = new ArrayList<>();

    public ReuniaoDTO(Long id, String titulo, String descricao,LocalDate dataReuniao, String link) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.dataReuniao = dataReuniao;
        this.link = link;
    }
    public ReuniaoDTO(Reuniao entity) {
        id = entity.getId();
        titulo = entity.getTitulo();
        descricao = entity.getDescricao();
        dataReuniao = entity.getDataReuniao();
        link = entity.getLink();
        entity.getParticipantes().forEach(participante -> participantes.add(participante.getNome()));
    }

    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public LocalDate getDataReuniao() {
        return dataReuniao;
    }

    public String getLink() {
        return link;
    }

    public List<String> getParticipantes() {
        return participantes;
    }
}
