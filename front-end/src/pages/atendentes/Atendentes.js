import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import ThemeToggler from '../../components/themeToggler/ThemeToggler';
import serviceHome from '../../Servicies/service';
import authService from '../../Servicies/authService';
import './Atendentes.css';

const Atendentes = () => {
  const [currentPage, setCurrentPage] = useState(0); // Pageable começa em 0
  const atendentesPerPage = 5;
  const [atendentes, setAtendentes] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAtendentes(currentPage, atendentesPerPage);

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

  // Função para buscar atendentes do backend
  const fetchAtendentes = async (page, size) => {
    try {
      const response = await serviceHome.obterUsuariosPorTipo('ATENDENTE', page, size);
      setAtendentes(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Erro ao buscar atendentes", error);
    }
  };

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleEditAtendente = (atendente) => {
    navigate(`/atendentes/${atendente.id}/editar`, { state: { atendente } });
  };

  const handleCreateAtendente = () => {
    navigate('/atendentes/novo');
  };

  const handleSearch = async () => {
    if (searchQuery.trim() !== '') {
      try {
        const response = await serviceHome.buscarAtendentesPorNome(searchQuery);
        setAtendentes(response);
        setTotalPages(1); // Ao buscar, redefinir a paginação para 1 página apenas
        setCurrentPage(0); // Resetar a página atual
      } catch (error) {
        console.error('Erro ao buscar atendentes', error);
      }
    } else {
      // Se a busca estiver vazia, buscar atendentes normalmente
      fetchAtendentes(currentPage, atendentesPerPage);
    }
  };

  return (
    <div className="container-dashboard-atendentes">
      <Sidebar />
      <main className="atendentes-main">
        <div className="top-bar">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Pesquisar por atendente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Pesquisar</button>
            <button className="create-btn" onClick={handleCreateAtendente}>Criar Atendente</button>
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
        <h1>Atendentes</h1>
        <table className="atendentes-table">
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
            {atendentes.length > 0 ? (
              atendentes.map((atendente) => (
                <tr key={atendente.id}>
                  <td>{atendente.id}</td>
                  <td>{atendente.nome}</td>
                  <td>{atendente.email}</td>
                  <td>{atendente.tipoUsuario}</td>
                  <td><button className="edit-btn" onClick={() => handleEditAtendente(atendente)}>Editar</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Nenhum atendente encontrado.</td>
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

export default Atendentes;
