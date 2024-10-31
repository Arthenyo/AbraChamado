package com.arthenyo.api.repositories;

import com.arthenyo.api.entities.Anotacoes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnotacoesRepository extends JpaRepository<Anotacoes,Long> {
}
