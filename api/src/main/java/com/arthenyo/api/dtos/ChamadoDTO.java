package com.arthenyo.api.dtos;

import com.arthenyo.api.entities.Chamado;
import com.arthenyo.api.entities.Usuario;
import com.arthenyo.api.entities.enums.StatusChamado;

import java.time.Instant;

public class ChamadoDTO {
    private Long id;
    private String titulo;
    private String descricao;
    private StatusChamado statusChamado;
    private Instant criacaoChamado;
    private Instant terminoChamado;
    private String usuario;
    private String atendente;

    public ChamadoDTO(Long id, String titulo, String descricao, StatusChamado statusChamado, Instant criacaoChamado, Instant terminoChamado, String usuario, String atendente) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.statusChamado = statusChamado;
        this.criacaoChamado = criacaoChamado;
        this.terminoChamado = terminoChamado;
        this.usuario = usuario;
        this.atendente = atendente;
    }
    public ChamadoDTO(Chamado entity) {
        id = entity.getId();
        titulo = entity.getTitulo();
        descricao = entity.getDescricao();
        statusChamado = entity.getStatusChamado();
        criacaoChamado = entity.getCriacaoChamado();
        terminoChamado = entity.getTerminoChamado();
        usuario = entity.getUsuario().getNome();
        atendente = entity.getAtendente().getNome();
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

    public StatusChamado getStatusChamado() {
        return statusChamado;
    }

    public Instant getCriacaoChamado() {
        return criacaoChamado;
    }

    public Instant getTerminoChamado() {
        return terminoChamado;
    }

    public String getUsuario() {
        return usuario;
    }

    public String getAtendente() {
        return atendente;
    }
}
