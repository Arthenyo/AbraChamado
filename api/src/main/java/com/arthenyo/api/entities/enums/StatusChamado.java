package com.arthenyo.api.entities.enums;

public enum StatusChamado {
    ABERTO("Aberto"),
    EM_ANDAMENTO("Em andamento"),
    FECHADO("Fechado");

    private String description;

    StatusChamado(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public String toString() {
        return this.description;
    }
}
