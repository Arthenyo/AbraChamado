package com.arthenyo.api.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Table(name = "tb_auditoria")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Auditoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String usuario;
    private String acao;
    private String entidade;
    private String descricao;
    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant timestamp;
}
