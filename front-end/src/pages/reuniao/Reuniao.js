import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import ThemeToggler from '../../components/themeToggler/ThemeToggler';
import serviceHome from '../../Servicies/service';
import authService from '../../Servicies/authService'; // Importando authService
import './Reuniao.css';

const Reuniao = () => {
  const [reunioes, setReunioes] = useState([]);
  const [novaReuniao, setNovaReuniao] = useState({
    titulo: '',
    descricao: '',
    dataReuniao: '',
    link: '',
    participantes: '',
  });
  const [error, setError] = useState('');
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  // Carregar reuniões do backend ao montar o componente
  useEffect(() => {
    const fetchReunioes = async () => {
      try {
        const response = await serviceHome.obterReunioes();
        setReunioes(response);
      } catch (error) {
        console.error('Erro ao carregar reuniões', error);
        setError('Erro ao carregar reuniões.');
      }
    };

    // Carregar informações do usuário logado
    const fetchUsuarioLogado = async () => {
      try {
        const user = await authService.getLoggedUser();
        setUsuarioLogado(user);
      } catch (error) {
        console.error('Erro ao obter usuário logado', error);
        setError('Erro ao obter usuário logado.');
      }
    };

    fetchReunioes();
    fetchUsuarioLogado();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaReuniao((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddReuniao = async () => {
    if (novaReuniao.titulo && novaReuniao.descricao && novaReuniao.dataReuniao) {
      try {
        const participantesArray = novaReuniao.participantes.split(',').map((p) => p.trim());
        const response = await serviceHome.criarReuniao({ ...novaReuniao, participantes: participantesArray });
        setReunioes((prev) => [...prev, response]);
        setNovaReuniao({ titulo: '', descricao: '', dataReuniao: '', link: '', participantes: '' });
      } catch (error) {
        console.error('Erro ao criar reunião', error);
        setError('Erro ao criar reunião.');
      }
    }
  };

  const handleDeleteReuniao = async (id) => {
    try {
      await serviceHome.deletarReuniao(id);
      setReunioes((prev) => prev.filter((reuniao) => reuniao.id !== id));
    } catch (error) {
      console.error('Erro ao excluir reunião', error);
      setError('Erro ao excluir reunião.');
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
                <p>Olá, <b>{usuarioLogado?.nome || 'Usuário'}</b></p>
                <small className="text-muted">{usuarioLogado?.tipoUsuario || 'Usuário'}</small>
              </div>
            </div>
            <ThemeToggler />
          </div>
        </div>
        <h1>Reuniões</h1>
        <div className="reuniao-form">
          <input
            type="text"
            name="titulo"
            placeholder="Título da Reunião"
            value={novaReuniao.titulo}
            onChange={handleInputChange}
          />
          <textarea
            name="descricao"
            placeholder="Descrição da Reunião"
            value={novaReuniao.descricao}
            onChange={handleInputChange}
          ></textarea>
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
            type="date"
            name="dataReuniao"
            value={novaReuniao.dataReuniao}
            onChange={handleInputChange}
          />
          <button onClick={handleAddReuniao}>Adicionar Reunião</button>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="reunioes-list">
          {reunioes.map((reuniao) => (
            <div key={reuniao.id} className="reuniao-item">
              <h3>{reuniao.titulo}</h3>
              <p><b>Descrição:</b> {reuniao.descricao}</p>
              <p><b>Participantes:</b> {reuniao.participantes.map(p => p.nome).join(', ')}</p>
              {reuniao.link && (
                <p><b>Link:</b> <a href={reuniao.link} target="_blank" rel="noopener noreferrer">Acessar Reunião</a></p>
              )}
              <p><b>Data:</b> {new Date(reuniao.dataReuniao).toLocaleDateString()}</p>
              <button onClick={() => handleDeleteReuniao(reuniao.id)}>Excluir Reunião</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Reuniao;
