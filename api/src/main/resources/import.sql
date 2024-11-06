-- Inserindo acessos
INSERT INTO tb_acesso (nome) VALUES ('ADMINISTRADOR');
INSERT INTO tb_acesso (nome) VALUES ('CLIENTE');
INSERT INTO tb_acesso (nome) VALUES ('SUPORTE');

-- Inserindo usuário
INSERT INTO tb_usuario (nome, email, senha) VALUES ('Arthenyo', 'teteno.acgba@gmail.com', '$2a$10$maRFhuLDQWld5I9d3a3Db.xS4rKZOOlBPdS8HFIaEwpLErITxujni');

-- Associando acesso ao usuário
INSERT INTO tb_usuario_acesso (usuario_id, acesso_id) VALUES (1, 1);

-- Inserindo chamados
INSERT INTO tb_chamado (titulo, descricao, status_chamado, criacao_chamado, termino_chamado, usuario_id, atendente_id) VALUES ('Erro no sistema de login', 'Usuário não consegue fazer login', 'ABERTO', NOW(), NULL, 1, 1);
INSERT INTO tb_chamado (titulo, descricao, status_chamado, criacao_chamado, termino_chamado, usuario_id, atendente_id) VALUES ('Problema no pagamento', 'Erro ao tentar realizar o pagamento via cartão', 'ABERTO', NOW(), NULL, 1, 1);
INSERT INTO tb_chamado (titulo, descricao, status_chamado, criacao_chamado, termino_chamado, usuario_id, atendente_id) VALUES ('Tela travada', 'Tela de cadastro fica travada após inserir os dados', 'EM_ANDAMENTO', NOW(), NULL, 1, 1);
INSERT INTO tb_chamado (titulo, descricao, status_chamado, criacao_chamado, termino_chamado, usuario_id, atendente_id) VALUES ('Bug na geração de relatório', 'Relatório financeiro não está sendo gerado', 'FECHADO', NOW(), NOW(), 1, 1);
INSERT INTO tb_chamado (titulo, descricao, status_chamado, criacao_chamado, termino_chamado, usuario_id, atendente_id) VALUES ('Erro ao atualizar perfil', 'Erro ao tentar atualizar os dados do perfil do usuário', 'ABERTO', NOW(), NULL, 1, 1);
INSERT INTO tb_chamado (titulo, descricao, status_chamado, criacao_chamado, termino_chamado, usuario_id, atendente_id) VALUES ('Dúvida sobre funcionalidade', 'Dúvida sobre como utilizar a funcionalidade X', 'FECHADO', NOW(), NOW(), 1, 1);

-- Associando chamados aos favoritos do usuário
INSERT INTO usuario_chamado_favorito (usuario_id, chamado_id) VALUES (1, 1);
INSERT INTO usuario_chamado_favorito (usuario_id, chamado_id) VALUES (1, 3);
INSERT INTO usuario_chamado_favorito (usuario_id, chamado_id) VALUES (1, 5);

-- Inserindo anotações
INSERT INTO tb_anotacoes (anotacao, autor_id, fixo) VALUES ('Atualização de sistema programada para o próximo sábado, das 22h às 02h.', 1, true);
INSERT INTO tb_anotacoes (anotacao, autor_id, fixo) VALUES ('Nova política de segurança foi implementada, revise os detalhes na seção de configurações.', 1, false);
INSERT INTO tb_anotacoes (anotacao, autor_id, fixo) VALUES ('Treinamento de uso do sistema disponível no próximo mês, inscreva-se!', 1, true);
INSERT INTO tb_anotacoes (anotacao, autor_id, fixo) VALUES ('Manutenção programada para este final de semana.', 1, false);
INSERT INTO tb_anotacoes (anotacao, autor_id, fixo) VALUES ('Novo recurso lançado: integração com serviço Y.', 1, false);
INSERT INTO tb_anotacoes (anotacao, autor_id, fixo) VALUES ('Bug conhecido: problema na página de login para alguns usuários.', 1, false);

