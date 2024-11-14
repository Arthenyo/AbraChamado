import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import ThemeToggler from '../../components/themeToggler/ThemeToggler';
import './Clientes.css';

const Clientes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const clientesPerPage = 5;
  const navigate = useNavigate();

  // Dummy data for clientes
  const clientes = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    name: `Cliente ${index + 1}`,
    email: `cliente${index + 1}@exemplo.com`,
    phone: `(11) 9${index + 1}000-0000`,
    address: `Rua Exemplo ${index + 1}, Cidade ${index % 5 + 1}`,
    status: ['Ativo', 'Inativo'][index % 2],
  }));

  const totalPages = Math.ceil(clientes.length / clientesPerPage);
  const currentClientes = clientes.slice(
    (currentPage - 1) * clientesPerPage,
    currentPage * clientesPerPage
  );

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleEditCliente = (cliente) => {
    navigate(`/clientes/${cliente.id}/editar`, { state: { cliente } });
  };

  const handleCreateCliente = () => {
    navigate('/clientes/novo');
  };

  return (
    <div className="container-dashboard-clientes">
      <Sidebar />
      <main className="clientes-main">
        <div className="top-bar">
          <div className="search-bar">
            <input type="text" placeholder="Pesquisar por cliente..." />
            <button>Pesquisar</button>
            <button className="create-btn" onClick={handleCreateCliente}>Criar Cliente</button>
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
        <h1>Clientes</h1>
        <table className="clientes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {currentClientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.name}</td>
                <td>{cliente.email}</td>
                <td>{cliente.phone}</td>
                <td>{cliente.address}</td>
                <td className={`status-${cliente.status.replace(' ', '-').toLowerCase()}`}>{cliente.status}</td>
                <td><button className="edit-btn" onClick={() => handleEditCliente(cliente)}>Editar</button></td>
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

export default Clientes;