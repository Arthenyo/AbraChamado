package com.arthenyo.api.repositories;

import com.arthenyo.api.entities.Anotacoes;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnotacoesRepository extends JpaRepository<Anotacoes,Long> {
    @Query("SELECT a FROM Anotacoes a WHERE a.fixo = true")
    List<Anotacoes> findAnotacoesFixadas();

    @Query("SELECT a FROM Anotacoes a WHERE a.fixo = false ORDER BY a.id DESC")
    List<Anotacoes> findUltimasAnotacoesNaoFixadas(Pageable pageable);

    default List<Anotacoes> findTop5Anotacoes() {
        List<Anotacoes> fixadas = findAnotacoesFixadas();
        int restante = 5 - fixadas.size();
        List<Anotacoes> naoFixadas = findUltimasAnotacoesNaoFixadas(PageRequest.of(0, restante));
        fixadas.addAll(naoFixadas);
        return fixadas;
    }
}
