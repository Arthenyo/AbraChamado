package com.arthenyo.api.repositories;

import com.arthenyo.api.entities.Chamado;
import com.arthenyo.api.entities.enums.StatusChamado;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

public interface ChamadoRepository extends JpaRepository<Chamado,Long> {

    @Query("SELECT c.statusChamado, COUNT(c) " +
            "FROM Chamado c " +
            "WHERE FORMATDATETIME(c.criacaoChamado, 'yyyy-MM-dd') = :data " +
            "GROUP BY c.statusChamado")
    List<Object[]> countChamadosGroupedByStatus(@Param("data") String data);

    @Query("SELECT COUNT(c) " +
            "FROM Chamado c " +
            "WHERE FORMATDATETIME(c.criacaoChamado, 'yyyy-MM-dd') = :data")
    Long countChamadosByData(@Param("data") String data);

    @Query("SELECT c FROM Chamado c ORDER BY c.criacaoChamado DESC")
    List<Chamado> findTopChamados(Pageable pageable);
    List<Chamado> findByTituloContainingIgnoreCase(String titulo);
    List<Chamado> findByStatusChamadoAndCriacaoChamadoBetween(StatusChamado status, Instant inicio, Instant fim);
    List<Chamado> findByCriacaoChamadoBetween(Instant inicio, Instant fim);
}
