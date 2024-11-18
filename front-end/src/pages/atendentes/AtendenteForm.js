import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import ThemeToggler from '../../components/themeToggler/ThemeToggler';
import { useNavigate, useParams } from 'react-router-dom';
import serviceHome from '../../Servicies/service';
import './AtendenteForm.css';

const AtendenteForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [atendente, setAtendente] = useState({
    nome: '',
    email: '',
    senha: '',
    tipoUsuario: 'ATENDENTE',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      // Busca os dados do atendente para edição
      const fetchAtendente = async () => {
        try {
          const response = await serviceHome.buscarChamadoPorId(id);
          setAtendente({
            ...response,
            senha: '', // Deixe a senha em branco para manter a atual
          });
        } catch (error) {
          console.error("Erro ao buscar atendente", error);
          setError('Erro ao carregar os dados do atendente.');
        }
      };
      fetchAtendente();
    }
  }, [isEditMode, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAtendente({ ...atendente, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEditMode) {
        // Atualizar atendente
        await serviceHome.atualizarCliente(id, {
          ...atendente,
          senha: atendente.senha || undefined, // Envia senha apenas se fornecida
        });
      } else {
        // Criar novo atendente
        await serviceHome.criarCliente(atendente);
      }
      navigate('/atendentes');
    } catch (error) {
      console.error('Erro ao salvar atendente', error);
      setError('Erro ao salvar os dados do atendente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-dashboard-atendente-form">
      <Sidebar />
      <main className="atendente-form-main">
        <div className="top-bar">
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
        <h1>{isEditMode ? 'Editar Atendente' : 'Criar Atendente'}</h1>
        {error && <p className="error-message">{error}</p>}
        <form className="atendente-form" onSubmit={handleSubmit}>
          <label>
            Nome
            <input
              type="text"
              name="nome"
              value={atendente.nome}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={atendente.email}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Tipo de Usuário
            <select
              name="tipoUsuario"
              value={atendente.tipoUsuario}
              onChange={handleInputChange}
              required
              disabled
            >
              <option value="ATENDENTE">Atendente</option>
            </select>
          </label>
          <label>
            Senha
            <input
              type="password"
              name="senha"
              value={atendente.senha}
              onChange={handleInputChange}
              required={!isEditMode} // Senha obrigatória apenas na criação
              placeholder={isEditMode ? 'Deixe em branco para manter a senha atual' : ''}
            />
          </label>
          <div className="form-buttons">
            <button type="button" onClick={() => navigate('/atendentes')} className="back-btn">
              Voltar
            </button>
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AtendenteForm;
