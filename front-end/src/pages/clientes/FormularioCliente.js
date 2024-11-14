import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import './FormularioCliente.css';

const FormularioCliente = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(location.state?.cliente || {
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'Ativo',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Cliente salvo:', cliente);
    navigate('/clientes');
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
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              value={cliente.name}
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
            <label htmlFor="phone">Telefone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={cliente.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Endereço</label>
            <input
              type="text"
              id="address"
              name="address"
              value={cliente.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={cliente.status}
              onChange={handleInputChange}
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={cliente.password}
              onChange={handleInputChange}
              required={!cliente.id}
              placeholder={cliente.id ? 'Deixe em branco para manter a senha atual' : ''}
            />
          </div>
          <button type="submit" className="save-btn">Salvar</button>
        </form>
      </main>
    </div>
  );
};

export default FormularioCliente;