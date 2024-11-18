import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import ThemeToggler from '../../components/themeToggler/ThemeToggler';
import serviceHome from '../../Servicies/service';
import authService from '../../Servicies/authService';
import './Anotacoes.css';

const Anotacoes = () => {
  const [anotacoes, setAnotacoes] = useState([]);
  const [newAnotacao, setNewAnotacao] = useState({ anotacao: '', fixo: false, autor: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentAnotacaoId, setCurrentAnotacaoId] = useState(null);
  const [error, setError] = useState('');
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  // Carregar anotações do backend ao montar o componente
  useEffect(() => {
    const fetchAnotacoes = async () => {
      try {
        const response = await serviceHome.obterAnotacoes();
        setAnotacoes(response);
      } catch (error) {
        console.error('Erro ao carregar anotações', error);
        setError('Erro ao carregar anotações.');
      }
    };

    // Carregar informações do usuário logado
    const fetchUsuarioLogado = async () => {
      try {
        const user = await authService.getLoggedUser();
        setUsuarioLogado(user);
      } catch (error) {
        console.error('Erro ao obter usuário logado', error);
        setError('Erro ao obter usuário logado.');
      }
    };

    fetchAnotacoes();
    fetchUsuarioLogado();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnotacao((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAnotacao = async () => {
    if (newAnotacao.anotacao && usuarioLogado) {
      try {
        const anotacaoComAutor = { ...newAnotacao, autor: usuarioLogado.nome };
        const response = await serviceHome.criarAnotacao(anotacaoComAutor);
        setAnotacoes((prev) => [...prev, response]);
        setNewAnotacao({ anotacao: '', fixo: false, autor: '' });
      } catch (error) {
        console.error('Erro ao criar anotação', error);
        setError('Erro ao criar anotação.');
      }
    }
  };

  const handleEditAnotacao = (id) => {
    const anotacao = anotacoes.find((anotacao) => anotacao.id === id);
    setNewAnotacao({ anotacao: anotacao.anotacao, fixo: anotacao.fixo, autor: anotacao.autor?.nome });
    setIsEditing(true);
    setCurrentAnotacaoId(id);
  };

  const handleUpdateAnotacao = async () => {
    try {
      const response = await serviceHome.atualizarAnotacao(currentAnotacaoId, newAnotacao);
      setAnotacoes((prev) =>
        prev.map((anotacao) =>
          anotacao.id === currentAnotacaoId ? response : anotacao
        )
      );
      setNewAnotacao({ anotacao: '', fixo: false, autor: '' });
      setIsEditing(false);
      setCurrentAnotacaoId(null);
    } catch (error) {
      console.error('Erro ao atualizar anotação', error);
      setError('Erro ao atualizar anotação.');
    }
  };

  const handleDeleteAnotacao = async (id) => {
    try {
      await serviceHome.deletarAnotacao(id);
      setAnotacoes((prev) => prev.filter((anotacao) => anotacao.id !== id));
    } catch (error) {
      console.error('Erro ao excluir anotação', error);
      setError('Erro ao excluir anotação.');
    }
  };

  const handlePinAnotacao = async (id) => {
    const anotacao = anotacoes.find((anotacao) => anotacao.id === id);
    const updatedAnotacao = { ...anotacao, fixo: !anotacao.fixo };
    try {
      const response = await serviceHome.atualizarAnotacao(id, updatedAnotacao);
      setAnotacoes((prev) =>
        prev.map((anotacao) => (anotacao.id === id ? response : anotacao))
      );
    } catch (error) {
      console.error('Erro ao fixar/desfixar anotação', error);
      setError('Erro ao fixar/desfixar anotação.');
    }
  };

  const sortedAnotacoes = [...anotacoes].sort((a, b) => b.fixo - a.fixo);

  return (
    <div className="container-dashboard-anotacoes">
      <Sidebar />
      <main className="anotacoes-main">
        <div className="top-bar">
          <div className="search-bar">
            <input type="text" placeholder="Pesquisar por anotação..." />
            <button>Pesquisar</button>
          </div>
          <div className="top-actions">
            <div className="profile">
              <div className="info">
                <p>Olá, <b>{usuarioLogado?.nome || 'Usuário'}</b></p>
                <small className="text-muted">{usuarioLogado?.tipoUsuario || 'Usuário'}</small>
              </div>
            </div>
            <ThemeToggler />
          </div>
        </div>
        <h1>Anotações</h1>
        <div className="anotacao-form">
          <textarea
            name="anotacao"
            placeholder="Conteúdo da anotação"
            value={newAnotacao.anotacao}
            onChange={handleInputChange}
          ></textarea>
          {isEditing ? (
            <button onClick={handleUpdateAnotacao}>Atualizar Anotação</button>
          ) : (
            <button onClick={handleAddAnotacao}>Adicionar Anotação</button>
          )}
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="anotacoes-list">
          {sortedAnotacoes.map((anotacao) => (
            <div key={anotacao.id} className={`anotacao-item ${anotacao.fixo ? 'pinned' : ''}`}>
              <p>{anotacao.anotacao}</p>
              <p className="autor-info">Autor: {anotacao.autor?.nome || 'Desconhecido'}</p>
              <div className="anotacao-actions">
                <button onClick={() => handleEditAnotacao(anotacao.id)}>Editar</button>
                <button onClick={() => handleDeleteAnotacao(anotacao.id)}>Excluir</button>
                <button onClick={() => handlePinAnotacao(anotacao.id)}>
                  {anotacao.fixo ? 'Desfixar' : 'Fixar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Anotacoes;
