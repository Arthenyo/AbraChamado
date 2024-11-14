import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import ThemeToggler from '../../components/themeToggler/ThemeToggler';
import './Atendentes.css';

const Atendentes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const atendentesPerPage = 5;
  const navigate = useNavigate();

  // Dummy data for atendentes
  const atendentes = Array.from({ length: 25 }, (_, index) => ({
    id: index + 1,
    name: `Atendente ${index + 1}`,
    email: `atendente${index + 1}@exemplo.com`,
    phone: `(11) 9${index + 1}000-0000`,
    setor: ['Financeiro', 'TI', 'RH'][index % 3],
    status: ['Ativo', 'Inativo'][index % 2],
  }));

  const totalPages = Math.ceil(atendentes.length / atendentesPerPage);
  const currentAtendentes = atendentes.slice(
    (currentPage - 1) * atendentesPerPage,
    currentPage * atendentesPerPage
  );

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleCreateCliente = () => {
    navigate('/atendentes/novo');
  };

  return (
    <div className="container-dashboard-atendentes">
      <Sidebar />
      <main className="atendentes-main">
        <div className="top-bar">
          <div className="search-bar">
            <input type="text" placeholder="Pesquisar por atendente..." />
            <button>Pesquisar</button>
            <button className="create-btn" onClick={handleCreateCliente}>Criar Atendente</button>
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
        <h1>Atendentes</h1>
        <table className="atendentes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Setor</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {currentAtendentes.map((atendente) => (
              <tr key={atendente.id}>
                <td>{atendente.id}</td>
                <td>{atendente.name}</td>
                <td>{atendente.email}</td>
                <td>{atendente.phone}</td>
                <td>{atendente.setor}</td>
                <td className={`status-${atendente.status.replace(' ', '-').toLowerCase()}`}>{atendente.status}</td>
                <td><button className="details-btn">Editar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}
          >
            &lt;&lt;
          </button>
          <span className="pagination-info">{currentPage}</span>
          <button
            className="pagination-btn"
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages}
          >
            &gt;&gt;
          </button>
        </div>
      </main>
    </div>
  );
};

export default Atendentes;