package com.arthenyo.api.repositories;

import com.arthenyo.api.entities.Acesso;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AcessoRepository extends JpaRepository<Acesso,Long> {
    Acesso findByNome(String nome);
}
