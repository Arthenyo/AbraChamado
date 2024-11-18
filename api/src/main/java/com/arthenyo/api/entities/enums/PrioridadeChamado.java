package com.arthenyo.api.entities.enums;

public enum PrioridadeChamado {
    BAIXA("Baixa"),
    MEDIA("Média"),
    ALTA("Alta"),
    CRITICA("Crítica");

    private String description;

    PrioridadeChamado(String description) {
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
