package com.arthenyo.api.entities.enums;

public enum TipoUsuario {
    CLIENTE("Cliente"),
    ATENDENTE("Atendente");

    private String description;

    TipoUsuario(String description) {
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
