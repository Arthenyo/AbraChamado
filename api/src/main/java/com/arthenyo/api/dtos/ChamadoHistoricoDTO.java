package com.arthenyo.api.dtos;

import com.arthenyo.api.entities.ChamadoHistorico;
import com.arthenyo.api.entities.enums.PrioridadeChamado;
import com.arthenyo.api.entities.enums.StatusChamado;

import java.time.Instant;

public class ChamadoHistoricoDTO {
    private String descricaoAlteracao;
    private String alteradoPor;
    private Instant dataAlteracao;
    private StatusChamado statusChamadoAnterior;
    private StatusChamado statusChamadoNovo;
    private PrioridadeChamado prioridadeAnterior;
    private PrioridadeChamado prioridadeNova;

    public ChamadoHistoricoDTO(ChamadoHistorico historico) {
        this.descricaoAlteracao = historico.getDescricaoAlteracao();
        this.alteradoPor = historico.getAlteradoPor();
        this.dataAlteracao = historico.getDataAlteracao();
        this.statusChamadoAnterior = historico.getStatusChamadoAnterior();
        this.statusChamadoNovo = historico.getStatusChamadoNovo();
        this.prioridadeAnterior = historico.getPrioridadeAnterior();
        this.prioridadeNova = historico.getPrioridadeNova();
    }

    public String getDescricaoAlteracao() {
        return descricaoAlteracao;
    }

    public String getAlteradoPor() {
        return alteradoPor;
    }

    public Instant getDataAlteracao() {
        return dataAlteracao;
    }

    public StatusChamado getStatusChamadoAnterior() {
        return statusChamadoAnterior;
    }

    public StatusChamado getStatusChamadoNovo() {
        return statusChamadoNovo;
    }

    public PrioridadeChamado getPrioridadeAnterior() {
        return prioridadeAnterior;
    }

    public PrioridadeChamado getPrioridadeNova() {
        return prioridadeNova;
    }
}
