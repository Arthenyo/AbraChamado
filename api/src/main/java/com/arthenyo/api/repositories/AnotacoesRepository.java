package com.arthenyo.api.repositories;

import com.arthenyo.api.entities.Anotacoes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnotacoesRepository extends JpaRepository<Anotacoes, Long> {
    @Query("SELECT a FROM Anotacoes a WHERE LOWER(a.anotacao) LIKE LOWER(CONCAT('%', :texto, '%'))")
    List<Anotacoes> buscarPorTexto(@Param("texto") String texto);
}
