package com.arthenyo.api.entities;

import com.arthenyo.api.entities.enums.PrioridadeChamado;
import com.arthenyo.api.entities.enums.StatusChamado;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;


@Entity
@Table(name = "tb_chamado")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Chamado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String descricao;
    @Enumerated(EnumType.STRING)
    private StatusChamado statusChamado;
    @Enumerated(EnumType.STRING)
    private PrioridadeChamado prioridadeChamado;
    private String setor;
    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant criacaoChamado;
    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant terminoChamado;
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
    @ManyToOne
    @JoinColumn(name = "atendente_id")
    private Usuario atendente;
}
