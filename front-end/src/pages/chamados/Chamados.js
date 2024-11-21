import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import ThemeToggler from '../../components/themeToggler/ThemeToggler';
import serviceHome from '../../Servicies/service';
import authService from '../../Servicies/authService';
import './Chamados.css';

const Chamados = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const chamadosPerPage = 5;
  const [chamados, setChamados] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLoggedUser = async () => {
      try {
        const user = await authService.getLoggedUser();
        setUserName(user.nome || 'Usuário');
        setUserRole(user.tipoUsuario || 'Acesso não definido');
      } catch (error) {
        console.error('Erro ao obter o usuário logado', error);
      }
    };

    fetchLoggedUser();
  }, []);

  useEffect(() => {
    fetchChamados(currentPage, chamadosPerPage);
  }, [currentPage]);

  const fetchChamados = async (pagina, tamanho) => {
    try {
      const response = await serviceHome.obterTodosChamados(pagina, tamanho);
      setChamados(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Erro ao buscar chamados', error);
    }
  };

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleViewDetails = async (chamadoId) => {
    try {
      const chamado = await serviceHome.buscarChamadoPorId(chamadoId);
      navigate(`/chamados/${chamado.id}`, { state: { chamado } });
    } catch (error) {
      console.error('Erro ao buscar detalhes do chamado', error);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim() !== '') {
      try {
        const response = await serviceHome.buscarChamadosPorTitulo(searchQuery);
        setChamados(response);
        setTotalPages(1);
        setCurrentPage(0);
      } catch (error) {
        console.error('Erro ao buscar chamados', error);
      }
    } else {
      fetchChamados(currentPage, chamadosPerPage);
    }
  };

  const handleAssumirChamado = async (chamadoId) => {
    try {
      const atendenteNome = userName; // O usuário atual assumirá o chamado
      await serviceHome.assumirChamado(chamadoId, atendenteNome);
      // Atualizar a lista de chamados
      fetchChamados(currentPage, chamadosPerPage);
    } catch (error) {
      console.error('Erro ao assumir chamado', error);
    }
  };

  const handleEditChamado = (chamadoId) => {
    navigate(`/abrir-chamado/${chamadoId}`);
  };  

  return (
    <div className="container-dashboard-chamados">
      <Sidebar />
      <main className="chamados-main">
        <div className="top-bar">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Pesquisar por chamado..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Pesquisar</button>
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
            {chamados.map((chamado) => (
              <tr key={chamado.id}>
                <td>{chamado.titulo}</td>
                <td>{chamado.usuario}</td>
                <td>{chamado.prioridadeChamado}</td>
                <td>{chamado.setor || 'N/A'}</td>
                <td>{chamado.atendente || 'N/A'}</td>
                <td className={`status-${chamado.statusChamado.replace(' ', '-').toLowerCase()}`}>{chamado.statusChamado}</td>
                <td>
                  <button className="details-btn" onClick={() => handleViewDetails(chamado.id)}>Detalhes</button>
                  {/* Mostrar botão "Assumir" somente se não houver atendente */}
                  {!chamado.atendente && (
                    <button className="edit-btn" onClick={() => handleAssumirChamado(chamado.id)}>Assumir</button>
                  )}
                  <button className="edit-btn" onClick={() => handleEditChamado(chamado.id)}>Editar</button>
                </td>
              </tr>
            ))}
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
          <span className="pagination-info">{currentPage + 1}</span>
          <button
            className="pagination-btn"
            onClick={() => handlePageChange('next')}
            disabled={currentPage >= totalPages - 1}
          >
            &gt;&gt;
          </button>
        </div>
      </main>
    </div>
  );
};

export default Chamados;
