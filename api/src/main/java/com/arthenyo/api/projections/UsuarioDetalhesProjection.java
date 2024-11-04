package com.arthenyo.api.projections;

public interface UsuarioDetalhesProjection {
    String getUsername();
    String getPassword();
    Long getRoleId();
    String getAuthority();
}
