// Sidebar.js (React Component)
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import '../../util/Colors.css';
import '../../GlobalStyles.css';
import authService from '../../Servicies/authService';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const handleLogout = () => {
    authService.logout(); // Chama o serviço de logout para remover o token
    navigate('/login');   // Redireciona o usuário para a página de login
  };

  return (
    <aside>
      <div className="top-sidebar">
        <div className="logo">
          <h2>ABRA<span className="danger">CHAMADO</span></h2>
        </div>
        <div className="close-sidebar" id="close-btn">
          <span className="material-icons-sharp">close</span>
        </div>
      </div>
      <div className="sidebar">
        <Link to="/home" className={activeLink === '/home' ? 'active' : ''} onClick={() => handleLinkClick('/home')}>
          <span className="material-icons-sharp">dashboard</span>
          <h3>Dashboard</h3>
        </Link>
        <Link to="/chamados" className={activeLink === '/chamados' ? 'active' : ''} onClick={() => handleLinkClick('/chamados')}>
          <span className="material-icons-sharp">assignment</span>
          <h3>Chamados</h3>
        </Link>
        <Link to="/abrir-chamado" className={activeLink === '/abrir-chamado' ? 'active' : ''} onClick={() => handleLinkClick('/abrir-chamado')}>
          <span className="material-icons-sharp">add_circle_outline</span>
          <h3>Abrir Chamado</h3>
        </Link>
        <Link to="/clientes" className={activeLink === '/clientes' ? 'active' : ''} onClick={() => handleLinkClick('/clientes')}>
          <span className="material-icons-sharp">people</span>
          <h3>Clientes</h3>
        </Link>
        <Link to="/atendentes" className={activeLink === '/atendentes' ? 'active' : ''} onClick={() => handleLinkClick('/atendentes')}>
          <span className="material-icons-sharp">support_agent</span>
          <h3>Atendentes</h3>
        </Link>
        <Link to="/anotacoes" className={activeLink === '/anotacoes' ? 'active' : ''} onClick={() => handleLinkClick('/anotacoes')}>
          <span className="material-icons-sharp">note</span>
          <h3>Anotações</h3>
        </Link>
        <Link to="/reuniao" className={activeLink === '/reuniao' ? 'active' : ''} onClick={() => handleLinkClick('/reuniao')}>
          <span className="material-icons-sharp">event</span>
          <h3>Reuniões</h3>
        </Link>
        <Link to="/relatorios" className={activeLink === '/relatorios' ? 'active' : ''} onClick={() => handleLinkClick('/relatorios')}>
          <span className="material-icons-sharp">bar_chart</span>
          <h3>Relatórios</h3>
        </Link>
        <button className="logout-btn" onClick={handleLogout}>
          <span className="material-icons-sharp">logout</span>
          <h3>Sair</h3>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
