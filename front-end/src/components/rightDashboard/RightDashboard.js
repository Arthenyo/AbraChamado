import React, { useEffect, useState } from 'react';
import ThemeToggler from '../themeToggler/ThemeToggler';
import RecentUpdates from '../recentUpdates/RecentUpdates';
import authService from '../../Servicies/authService'; // Importando o AuthService
import './RightDashboard.css';

const RightDashboard = () => {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Chama o serviço para obter o usuário logado
    const fetchLoggedUser = async () => {
      try {
        const user = await authService.getLoggedUser();
        setUserName(user.nome || 'Usuário'); // Usar 'Usuário' como fallback caso o nome não exista
        
        // Pegue o tipo de usuário do usuário logado
        setUserRole(user.tipoUsuario || 'Acesso não definido');
      } catch (error) {
        console.error('Erro ao obter o usuário logado', error);
      }
    };

    fetchLoggedUser();
  }, []);

  return (
    <div className="right-dashboard">
      <div className="top">
        <ThemeToggler />
        <div className="profile">
          <div className="info">
            <p>Olá, <b>{userName}</b></p>
            <small className="text-muted">{userRole}</small>
          </div>
        </div>
      </div>
      <RecentUpdates />
    </div>
  );
};

export default RightDashboard;
