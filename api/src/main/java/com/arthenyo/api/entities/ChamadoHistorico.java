package com.arthenyo.api.entities;

import com.arthenyo.api.entities.enums.PrioridadeChamado;
import com.arthenyo.api.entities.enums.StatusChamado;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChamadoHistorico {
    private String descricaoAlteracao;
    private String alteradoPor;
    private Instant dataAlteracao;
    private StatusChamado statusChamadoAnterior;
    private StatusChamado statusChamadoNovo;
    private PrioridadeChamado prioridadeAnterior;
    private PrioridadeChamado prioridadeNova;
}

