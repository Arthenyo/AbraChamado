package com.arthenyo.api.repositories;

import com.arthenyo.api.entities.Chamado;
import com.arthenyo.api.entities.enums.StatusChamado;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChamadoRepository extends JpaRepository<Chamado,Long> {

    @Query("SELECT COUNT(c) FROM Chamado c")
    long countTotalChamados();

    @Query("SELECT COUNT(c) FROM Chamado c WHERE c.statusChamado = ?1")
    long countByStatusChamado(StatusChamado statusChamado);
    @Query("SELECT c FROM Chamado c WHERE c.statusChamado = ?1 ORDER BY c.criacaoChamado DESC")
    List<Chamado> findTop5ByStatusChamadoOrderByCriacaoChamadoDesc(StatusChamado statusChamado, Pageable pageable);

    default List<Chamado> findTop5ChamadosAbertos() {
        return findTop5ByStatusChamadoOrderByCriacaoChamadoDesc(StatusChamado.ABERTO, PageRequest.of(0, 5));
    }
}
