import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import './DetalhesChamado.css';

const DetalhesChamado = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { chamado } = location.state;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container-dashboard-detalhes-chamado">
      <Sidebar />
      <main className="detalhes-chamado-main">
        <button className="back-btn" onClick={handleBack}>&larr; Voltar</button>
        <h1>Detalhes do Chamado</h1>
        <div className="chamado-info">
          <p><b>ID:</b> {chamado.id}</p>
          <p><b>Assunto:</b> {chamado.subject}</p>
          <p><b>Usuário:</b> {chamado.user}</p>
          <p><b>Prioridade:</b> {chamado.priority}</p>
          <p><b>Setor:</b> {chamado.sector}</p>
          <p><b>Atendente:</b> {chamado.attendant}</p>
          <p><b>Status:</b> {chamado.status}</p>
          <p><b>Descrição:</b> {chamado.description}</p>
        </div>
        <div className="chamado-historico">
          <h2>Histórico de Atualizações</h2>
          <ul>
            {chamado.history.map((item, index) => (
              <li key={index} className="historico-item">
                <p><b>Data:</b> {item.date}</p>
                <p><b>Ação:</b> {item.action}</p>
                <p><b>Descrição:</b> {item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default DetalhesChamado;