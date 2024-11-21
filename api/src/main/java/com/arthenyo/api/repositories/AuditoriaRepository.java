package com.arthenyo.api.repositories;

import com.arthenyo.api.entities.Auditoria;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Instant;
import java.util.List;

public interface AuditoriaRepository extends JpaRepository<Auditoria,Long> {
    List<Auditoria> findByTimestampBetween(Instant inicio, Instant fim);
    List<Auditoria> findTop3ByOrderByTimestampDesc();


}
