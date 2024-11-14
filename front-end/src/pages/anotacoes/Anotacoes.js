import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import ThemeToggler from '../../components/themeToggler/ThemeToggler';
import './Anotacoes.css';

const Anotacoes = () => {
  const [anotacoes, setAnotacoes] = useState([
    { id: 1, title: 'Anotação 1', content: 'Conteúdo da anotação 1', createdAt: new Date(), updatedAt: new Date(), isPinned: false },
    { id: 2, title: 'Anotação 2', content: 'Conteúdo da anotação 2', createdAt: new Date(), updatedAt: new Date(), isPinned: false },
  ]);
  const [newAnotacao, setNewAnotacao] = useState({ title: '', content: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentAnotacaoId, setCurrentAnotacaoId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnotacao((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAnotacao = () => {
    if (newAnotacao.title && newAnotacao.content) {
      setAnotacoes((prev) => [
        ...prev,
        { id: prev.length + 1, ...newAnotacao, createdAt: new Date(), updatedAt: new Date(), isPinned: false },
      ]);
      setNewAnotacao({ title: '', content: '' });
    }
  };

  const handleEditAnotacao = (id) => {
    const anotacao = anotacoes.find((anotacao) => anotacao.id === id);
    setNewAnotacao({ title: anotacao.title, content: anotacao.content });
    setIsEditing(true);
    setCurrentAnotacaoId(id);
  };

  const handleUpdateAnotacao = () => {
    setAnotacoes((prev) =>
      prev.map((anotacao) =>
        anotacao.id === currentAnotacaoId
          ? { ...anotacao, title: newAnotacao.title, content: newAnotacao.content, updatedAt: new Date() }
          : anotacao
      )
    );
    setNewAnotacao({ title: '', content: '' });
    setIsEditing(false);
    setCurrentAnotacaoId(null);
  };

  const handleDeleteAnotacao = (id) => {
    setAnotacoes((prev) => prev.filter((anotacao) => anotacao.id !== id));
  };

  const handlePinAnotacao = (id) => {
    setAnotacoes((prev) =>
      prev.map((anotacao) =>
        anotacao.id === id ? { ...anotacao, isPinned: !anotacao.isPinned } : anotacao
      )
    );
  };

  const sortedAnotacoes = [...anotacoes].sort((a, b) => b.isPinned - a.isPinned);

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
                <p>Olá, <b>Arthenyo</b></p>
                <small className="text-muted">Admin</small>
              </div>
            </div>
            <ThemeToggler />
          </div>
        </div>
        <h1>Anotações</h1>
        <div className="anotacao-form">
          <input
            type="text"
            name="title"
            placeholder="Título da anotação"
            value={newAnotacao.title}
            onChange={handleInputChange}
          />
          <textarea
            name="content"
            placeholder="Conteúdo da anotação"
            value={newAnotacao.content}
            onChange={handleInputChange}
          ></textarea>
          {isEditing ? (
            <button onClick={handleUpdateAnotacao}>Atualizar Anotação</button>
          ) : (
            <button onClick={handleAddAnotacao}>Adicionar Anotação</button>
          )}
        </div>
        <div className="anotacoes-list">
          {sortedAnotacoes.map((anotacao) => (
            <div key={anotacao.id} className={`anotacao-item ${anotacao.isPinned ? 'pinned' : ''}`}>
              <h3>{anotacao.title}</h3>
              <p>{anotacao.content}</p>
              <p className="dates">
                Criado em: {anotacao.createdAt.toLocaleDateString()} {anotacao.createdAt.toLocaleTimeString()}<br />
                Última atualização: {anotacao.updatedAt.toLocaleDateString()} {anotacao.updatedAt.toLocaleTimeString()}
              </p>
              <div className="anotacao-actions">
                <button onClick={() => handleEditAnotacao(anotacao.id)}>Editar</button>
                <button onClick={() => handleDeleteAnotacao(anotacao.id)}>Excluir</button>
                <button onClick={() => handlePinAnotacao(anotacao.id)}>
                  {anotacao.isPinned ? 'Desfixar' : 'Fixar'}
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