package com.arthenyo.api.repositories;

import com.arthenyo.api.entities.Anotacoes;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnotacoesRepository extends JpaRepository<Anotacoes,Long> {
}
