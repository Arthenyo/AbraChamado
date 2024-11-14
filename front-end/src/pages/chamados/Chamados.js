import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import ThemeToggler from '../../components/themeToggler/ThemeToggler';
import './Chamados.css';

const Chamados = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const chamadosPerPage = 5;
  const navigate = useNavigate();

  // Dummy data for chamados
  const chamados = Array.from({ length: 35 }, (_, index) => ({
    id: index + 1,
    subject: `Chamado ${index + 1}`,
    user: `Usuário ${index + 1}`,
    priority: ['Baixa', 'Média', 'Alta'][index % 3],
    sector: ['Financeiro', 'TI', 'RH'][index % 3],
    attendant: ['João', 'Maria', 'Carlos'][index % 3],
    status: ['Aberto', 'Em Andamento', 'Resolvido'][index % 3],
    description: `Descrição detalhada do chamado ${index + 1}.`,
    history: [
      { date: '2024-11-01', action: 'Chamado aberto', description: 'Descrição inicial do chamado.' },
      { date: '2024-11-02', action: 'Chamado em andamento', description: 'Chamado está sendo analisado pela equipe técnica.' },
      { date: '2024-11-03', action: 'Chamado resolvido', description: 'Problema foi resolvido e o chamado foi fechado.' },
    ],
  }));

  const totalPages = Math.ceil(chamados.length / chamadosPerPage);
  const currentChamados = chamados.slice(
    (currentPage - 1) * chamadosPerPage,
    currentPage * chamadosPerPage
  );

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleViewDetails = (chamado) => {
    navigate(`/chamados/${chamado.id}`, { state: { chamado } });
  };

  return (
    <div className="container-dashboard-chamados">
      <Sidebar />
      <main className="chamados-main">
        <div className="top-bar">
          <div className="search-bar">
            <input type="text" placeholder="Pesquisar por chamado..." />
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
        <h1>Chamados</h1>
        <table className="chamados-table">
          <thead>
            <tr>
              <th>Assunto</th>
              <th>Usuário</th>
              <th>Prioridade</th>
              <th>Setor</th>
              <th>Atendente</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {currentChamados.map((chamado) => (
              <tr key={chamado.id}>
                <td>{chamado.subject}</td>
                <td>{chamado.user}</td>
                <td>{chamado.priority}</td>
                <td>{chamado.sector}</td>
                <td>{chamado.attendant}</td>
                <td className={`status-${chamado.status.replace(' ', '-').toLowerCase()}`}>{chamado.status}</td>
                <td><button className="details-btn" onClick={() => handleViewDetails(chamado)}>Detalhes</button></td>
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

export default Chamados;