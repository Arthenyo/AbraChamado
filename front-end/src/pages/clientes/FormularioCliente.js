import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import serviceHome from '../../Servicies/service';
import './FormularioCliente.css';

const FormularioCliente = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(location.state?.cliente || {
    id: '',
    nome: '',
    email: '',
    senha: '',
    tipoUsuario: 'CLIENTE', // valor padrão para novos clientes
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (location.state?.cliente?.id) {
      // Se estiver editando, buscar o cliente usando o ID
      const fetchCliente = async () => {
        try {
          const response = await serviceHome.buscarClientePorId(location.state.cliente.id);
          setCliente({
            ...response,
            senha: '', // Deixe a senha em branco para manter a atual
          });
        } catch (error) {
          console.error("Erro ao buscar cliente", error);
          setError('Erro ao carregar os dados do cliente.');
        }
      };
      fetchCliente();
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (cliente.id) {
        // Editar cliente
        await serviceHome.atualizarCliente(cliente.id, {
          ...cliente,
          senha: cliente.senha || undefined, // Envia senha apenas se fornecida
        });
      } else {
        // Criar novo cliente
        await serviceHome.criarCliente(cliente);
      }
      navigate('/clientes');
    } catch (error) {
      console.error('Erro ao salvar cliente', error);
      setError('Erro ao salvar os dados do cliente.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/clientes');
  };

  return (
    <div className="container-dashboard-formulario-cliente">
      <Sidebar />
      <main className="formulario-cliente-main">
        <button className="back-btn" onClick={handleBack}>Voltar</button>
        <h1>{cliente.id ? 'Editar Cliente' : 'Criar Cliente'}</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={cliente.nome}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={cliente.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tipoUsuario">Tipo de Usuário</label>
            <select
              id="tipoUsuario"
              name="tipoUsuario"
              value={cliente.tipoUsuario}
              onChange={handleInputChange}
              required
            >
              <option value="CLIENTE">Cliente</option>
              <option value="ADMIN">Admin</option>
              <option value="SUPORTE">Suporte</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={cliente.senha}
              onChange={handleInputChange}
              placeholder={cliente.id ? 'Deixe em branco para manter a senha atual' : ''}
              required={!cliente.id} // Senha obrigatória apenas na criação
            />
          </div>
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default FormularioCliente;
