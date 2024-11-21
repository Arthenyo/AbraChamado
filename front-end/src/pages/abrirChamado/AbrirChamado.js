import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import ThemeToggler from '../../components/themeToggler/ThemeToggler';
import serviceHome from '../../Servicies/service';
import authService from '../../Servicies/authService';
import './AbrirChamado.css';

const AbrirChamado = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chamado, setChamado] = useState({
    titulo: '',
    descricao: '',
    statusChamado: 'ABERTO',
    prioridadeChamado: 'BAIXA',
    setor: '',
    usuario: ''
  });
  const [setores, setSetores] = useState([]);
  const [clientes, setClientes] = useState([]);
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
      } catch (error) {
        console.error('Erro ao obter usuário logado', error);
        setError('Erro ao obter usuário logado. Tente novamente mais tarde.');
      }
    };

    // Carregar lista de clientes
    const fetchClientes = async () => {
      try {
        const response = await serviceHome.obterTodosClientes();
        setClientes(response);
      } catch (error) {
        console.error('Erro ao obter lista de clientes', error);
        setError('Erro ao obter lista de clientes. Tente novamente mais tarde.');
      }
    };

    // Se estamos no modo de edição, carregar os detalhes do chamado
    const fetchChamado = async () => {
      if (id) {
        try {
          const chamadoExistente = await serviceHome.buscarChamadoPorId(id);
          setChamado({
            titulo: chamadoExistente.titulo,
            descricao: chamadoExistente.descricao,
            statusChamado: chamadoExistente.statusChamado,
            prioridadeChamado: chamadoExistente.prioridadeChamado,
            setor: chamadoExistente.setor,
            usuario: chamadoExistente.usuario,
          });
        } catch (error) {
          console.error('Erro ao buscar chamado para edição', error);
          setError('Erro ao buscar chamado para edição. Tente novamente mais tarde.');
        }
      }
    };

    fetchUsuarioLogado();
    fetchClientes();
    fetchChamado();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChamado((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (id) {
        // Editar chamado existente
        await serviceHome.atualizarChamado(id, chamado);
        alert('Chamado atualizado com sucesso!');
      } else {
        // Abrir um novo chamado
        await serviceHome.salvarChamado(chamado);
        alert('Chamado aberto com sucesso!');
      }
      navigate('/chamados');
    } catch (error) {
      console.error('Erro ao salvar chamado', error);
      setError('Erro ao salvar chamado. Tente novamente mais tarde.');
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
        <h1>{id ? 'Editar Chamado' : 'Abrir Chamado'}</h1>
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
            Cliente
            <select
              name="usuario"
              value={chamado.usuario}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione o Cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.nome}>{cliente.nome}</option>
              ))}
            </select>
          </label>
          {/* Exibir campo de status apenas se estivermos no modo de edição */}
          {id && (
            <label>
              Status do Chamado
              <select
                name="statusChamado"
                value={chamado.statusChamado}
                onChange={handleInputChange}
                required
              >
                <option value="ABERTO">Aberto</option>
                <option value="EM_ANDAMENTO">Em Andamento</option>
                <option value="FECHADO">Fechado</option>
              </select>
            </label>
          )}
          <button type="submit" className="save-btn">
            {id ? 'Salvar Alterações' : 'Abrir Chamado'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default AbrirChamado;
