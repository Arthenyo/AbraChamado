INSERT INTO tb_acesso (nome) VALUES ('ADMINISTRADOR');
INSERT INTO tb_acesso (nome) VALUES ('CLIENTE');
INSERT INTO tb_acesso (nome) VALUES ('SUPORTE');

INSERT INTO tb_usuario (nome, email, senha) VALUES ('Arthenyo', 'teteno.acgba@gmail.com', '$2a$10$maRFhuLDQWld5I9d3a3Db.xS4rKZOOlBPdS8HFIaEwpLErITxujni');

INSERT INTO tb_usuario_acesso (usuario_id, acesso_id) VALUES (1, 1);