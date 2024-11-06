package com.arthenyo.api.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_anotacoes")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Anotacoes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String anotacao;
    private boolean fixo;
    @ManyToOne
    @JoinColumn(name = "autor_id")
    private Usuario autor;
}
