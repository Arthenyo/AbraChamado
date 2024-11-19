package com.arthenyo.api.repositories;

import com.arthenyo.api.entities.Reuniao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReuniaoRepository extends JpaRepository<Reuniao, Long> {

    @Query("SELECT r FROM Reuniao r WHERE LOWER(r.titulo) LIKE LOWER(CONCAT('%', :texto, '%')) " +
            "OR LOWER(r.descricao) LIKE LOWER(CONCAT('%', :texto, '%'))")
    List<Reuniao> buscarPorTituloOuDescricao(@Param("texto") String texto);
}
