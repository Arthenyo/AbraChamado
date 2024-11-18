import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import ThemeToggler from '../../components/themeToggler/ThemeToggler';
import serviceHome from '../../Servicies/service';
import authService from '../../Servicies/authService';
import './AbrirChamado.css';

const AbrirChamado = () => {
  const [chamado, setChamado] = useState({
    titulo: '',
    descricao: '',
    statusChamado: 'ABERTO',
    prioridadeChamado: 'BAIXA',
    setor: '',
    usuario: '',
    atendente: ''
  });
  const [setores, setSetores] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Carregar setores (pode ser de uma API ou valores fixos)
    setSetores(['Financeiro', 'TI', 'RH', 'Contabilidade']);

    // Obter usuário logado
    const fetchUsuarioLogado = async () => {
      try {
        const user = await authService.getLoggedUser();
        setUsuarioLogado(user.nome);
        setChamado((prev) => ({ ...prev, usuario: user.nome, atendente: user.nome }));
      } catch (error) {
        console.error('Erro ao obter usuário logado', error);
        setError('Erro ao obter usuário logado. Tente novamente mais tarde.');
      }
    };

    fetchUsuarioLogado();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChamado((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await serviceHome.salvarChamado(chamado);
      alert('Chamado aberto com sucesso!');
      setChamado({ titulo: '', descricao: '', statusChamado: 'ABERTO', prioridadeChamado: 'BAIXA', setor: '', usuario: usuarioLogado, atendente: usuarioLogado });
    } catch (error) {
      console.error('Erro ao abrir chamado', error);
      setError('Erro ao abrir chamado. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="container-dashboard-abrir-chamado">
      <Sidebar />
      <main className="abrir-chamado-main">
        <div className="top-bar">
          <div className="top-actions">
            <div className="profile">
              <div className="info">
                <p>Olá, <b>{usuarioLogado}</b></p>
                <small className="text-muted">Admin</small>
              </div>
            </div>
            <ThemeToggler />
          </div>
        </div>
        <h1>Abrir Chamado</h1>
        {error && <p className="error-message">{error}</p>}
        <form className="abrir-chamado-form" onSubmit={handleSubmit}>
          <label>
            Título
            <input
              type="text"
              name="titulo"
              value={chamado.titulo}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Descrição
            <textarea
              name="descricao"
              value={chamado.descricao}
              onChange={handleInputChange}
              required
            ></textarea>
          </label>
          <label>
            Prioridade
            <select
              name="prioridadeChamado"
              value={chamado.prioridadeChamado}
              onChange={handleInputChange}
              required
            >
              <option value="BAIXA">Baixa</option>
              <option value="MEDIA">Média</option>
              <option value="ALTA">Alta</option>
            </select>
          </label>
          <label>
            Setor
            <select
              name="setor"
              value={chamado.setor}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione o Setor</option>
              {setores.map((setor, index) => (
                <option key={index} value={setor}>{setor}</option>
              ))}
            </select>
          </label>
          <label>
            Usuário
            <input
              type="text"
              name="usuario"
              value={chamado.usuario}
              onChange={handleInputChange}
              readOnly
            />
          </label>
          <label>
            Atendente
            <input
              type="text"
              name="atendente"
              value={chamado.atendente}
              onChange={handleInputChange}
              readOnly
            />
          </label>
          <button type="submit" className="save-btn">
            Abrir Chamado
          </button>
        </form>
      </main>
    </div>
  );
};

export default AbrirChamado;
