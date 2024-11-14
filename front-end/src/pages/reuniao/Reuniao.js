import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import ThemeToggler from '../../components/themeToggler/ThemeToggler';
import './Reuniao.css';

const Reuniao = () => {
  const [reunioes, setReunioes] = useState([
    {
      id: 1,
      assunto: 'Discussão de Projeto X',
      propostaPor: 'João Silva',
      participantes: ['Maria Souza', 'Carlos Lima', 'Ana Costa'],
      link: 'https://meet.example.com/abc123',
      plataforma: 'Google Meet',
      data: new Date().toLocaleDateString(),
      status: 'Concluída',
    },
  ]);

  const [novaReuniao, setNovaReuniao] = useState({
    assunto: '',
    propostaPor: '',
    participantes: '',
    link: '',
    plataforma: '',
    data: '',
    status: 'Pendente',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaReuniao((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddReuniao = () => {
    if (novaReuniao.assunto && novaReuniao.propostaPor && novaReuniao.data) {
      setReunioes((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          ...novaReuniao,
          participantes: novaReuniao.participantes.split(',').map((p) => p.trim()),
        },
      ]);
      setNovaReuniao({ assunto: '', propostaPor: '', participantes: '', link: '', plataforma: '', data: '', status: 'Pendente' });
    }
  };

  return (
    <div className="container-dashboard-reuniao">
      <Sidebar />
      <main className="reuniao-main">
        <div className="top-bar">
          <div className="search-bar">
            <input type="text" placeholder="Pesquisar por reunião..." />
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
        <h1>Reuniões</h1>
        <div className="reuniao-form">
          <input
            type="text"
            name="assunto"
            placeholder="Assunto da Reunião"
            value={novaReuniao.assunto}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="propostaPor"
            placeholder="Proposta por"
            value={novaReuniao.propostaPor}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="participantes"
            placeholder="Participantes (separados por vírgula)"
            value={novaReuniao.participantes}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="link"
            placeholder="Link da Reunião"
            value={novaReuniao.link}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="plataforma"
            placeholder="Plataforma (ou Presencial)"
            value={novaReuniao.plataforma}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="data"
            value={novaReuniao.data}
            onChange={handleInputChange}
          />
          <select name="status" value={novaReuniao.status} onChange={handleInputChange}>
            <option value="Pendente">Pendente</option>
            <option value="Concluída">Concluída</option>
          </select>
          <button onClick={handleAddReuniao}>Adicionar Reunião</button>
        </div>
        <div className="reunioes-list">
          {reunioes.map((reuniao) => (
            <div key={reuniao.id} className="reuniao-item">
              <h3>{reuniao.assunto}</h3>
              <p><b>Proposta por:</b> {reuniao.propostaPor}</p>
              <p><b>Participantes:</b> {reuniao.participantes.join(', ')}</p>
              {reuniao.link && (
                <p><b>Link:</b> <a href={reuniao.link} target="_blank" rel="noopener noreferrer">Acessar Reunião</a></p>
              )}
              <p><b>Plataforma:</b> {reuniao.plataforma}</p>
              <p><b>Data:</b> {reuniao.data}</p>
              <p className={`status-${reuniao.status.toLowerCase()}`}><b>Status:</b> {reuniao.status}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Reuniao;