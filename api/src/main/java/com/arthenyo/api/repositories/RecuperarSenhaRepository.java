package com.arthenyo.api.repositories;

import com.arthenyo.api.entities.RecuperarSenha;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Instant;
import java.util.List;

public interface RecuperarSenhaRepository extends JpaRepository<RecuperarSenha,Long> {

    @Query("SELECT obj FROM RecuperarSenha obj WHERE obj.token = :token AND obj.expiration > :now")
    List<RecuperarSenha> pesquisarTokensValidos(String token, Instant now);
}
