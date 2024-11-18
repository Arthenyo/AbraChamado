import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import ThemeToggler from '../../components/themeToggler/ThemeToggler';
import serviceHome from '../../Servicies/service';
import authService from '../../Servicies/authService'; // Importar o authService para obter dados do usuário logado
import './Clientes.css';

const Clientes = () => {
  const [currentPage, setCurrentPage] = useState(0); // Pageable começa em 0
  const clientesPerPage = 5;
  const [clientes, setClientes] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    fetchClientes(currentPage, clientesPerPage);

    // Chama o serviço para obter o usuário logado
    const fetchLoggedUser = async () => {
      try {
        const user = await authService.getLoggedUser();
        setUserName(user.nome || 'Usuário'); // Usar 'Usuário' como fallback caso o nome não exista
        setUserRole(user.tipoUsuario || 'Acesso não definido'); // Pegar o tipo de usuário
      } catch (error) {
        console.error('Erro ao obter o usuário logado', error);
      }
    };

    fetchLoggedUser();
  }, [currentPage]);

  // Função para buscar clientes do backend
  const fetchClientes = async (page, size) => {
    try {
      const response = await serviceHome.obterUsuariosPorTipo('CLIENTE', page, size);
      setClientes(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Erro ao buscar clientes", error);
    }
  };

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages - 1) {
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
                <p>Olá, <b>{userName}</b></p>
                <small className="text-muted">{userRole}</small>
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
              <th>Tipo de Usuário</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length > 0 ? (
              clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.tipoUsuario}</td>
                  <td><button className="edit-btn" onClick={() => handleEditCliente(cliente)}>Editar</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Nenhum cliente encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 0}
          >
            &lt;&lt;
          </button>
          <span className="pagination-info">{currentPage + 1} de {totalPages}</span>
          <button
            className="pagination-btn"
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages - 1}
          >
            &gt;&gt;
          </button>
        </div>
      </main>
    </div>
  );
};

export default Clientes;
