import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import ThemeToggler from '../../components/themeToggler/ThemeToggler';
import { useNavigate, useParams } from 'react-router-dom';
import './AtendenteForm.css';

const AtendenteForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [atendente, setAtendente] = useState({
    name: isEditMode ? `Atendente ${id}` : '',
    email: isEditMode ? `atendente${id}@exemplo.com` : '',
    phone: isEditMode ? `(11) 9${id}000-0000` : '',
    setor: isEditMode ? ['Financeiro', 'TI', 'RH'][id % 3] : '',
    status: isEditMode ? ['Ativo', 'Inativo'][id % 2] : 'Ativo',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAtendente({ ...atendente, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para salvar o atendente
    console.log('Dados do Atendente:', atendente);
    navigate('/atendentes');
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
        <form className="atendente-form" onSubmit={handleSubmit}>
          <label>
            Nome
            <input
              type="text"
              name="name"
              value={atendente.name}
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
            Telefone
            <input
              type="text"
              name="phone"
              value={atendente.phone}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Setor
            <input
              type="text"
              name="setor"
              value={atendente.setor}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Status
            <select
              name="status"
              value={atendente.status}
              onChange={handleInputChange}
              required
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </label>
          <label>
            Senha
            <input
              type="password"
              name="password"
              value={atendente.password}
              onChange={handleInputChange}
              required
            />
          </label>
          <div className="form-buttons">
            <button type="button" onClick={() => navigate('/atendentes')} className="back-btn">
              Voltar
            </button>
            <button type="submit" className="save-btn">
              Salvar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AtendenteForm;
