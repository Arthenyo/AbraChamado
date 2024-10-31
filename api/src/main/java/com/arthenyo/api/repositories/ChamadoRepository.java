package com.arthenyo.api.repositories;

import com.arthenyo.api.entities.Chamado;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChamadoRepository extends JpaRepository<Chamado,Long> {
}
