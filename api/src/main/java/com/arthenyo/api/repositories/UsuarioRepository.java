package com.arthenyo.api.repositories;

import com.arthenyo.api.entities.Usuario;
import com.arthenyo.api.projections.UsuarioDetalhesProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario,Long> {
    Usuario findByNome(String nome);
    Usuario findByEmail(String email);
    @Query(nativeQuery = true, value = """
			SELECT tb_usuario.email AS username, tb_usuario.senha AS password, tb_acesso.id AS roleId, tb_acesso.nome
			FROM tb_usuario
			INNER JOIN tb_usuario_acesso ON tb_usuario.id = tb_usuario_acesso.usuario_id
			INNER JOIN tb_acesso ON tb_acesso.id = tb_usuario_acesso.acesso_id
			WHERE tb_usuario.email = :email
		""")
    List<UsuarioDetalhesProjection> searchUserAndRolesByEmail(String email);
}
