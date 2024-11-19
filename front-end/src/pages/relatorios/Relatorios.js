import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import ThemeToggler from '../../components/themeToggler/ThemeToggler';
import serviceHome from '../../Servicies/service';
import authService from '../../Servicies/authService';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';  // Biblioteca para gerar tabelas
import './Relatorios.css';

const Relatorios = () => {
  const [relatoriosDisponiveis, setRelatoriosDisponiveis] = useState([
    { id: 1, titulo: 'Relatório de Chamados Abertos', descricao: 'Análise de todos os chamados abertos no período selecionado.', tipo: 'chamados-abertos', autor: 'Sistema' },
    { id: 2, titulo: 'Relatório de Chamados Resolvidos', descricao: 'Análise dos chamados resolvidos no período selecionado.', tipo: 'chamados-resolvidos', autor: 'Sistema' },
    { id: 3, titulo: 'Relatório de Desempenho por Técnico', descricao: 'Relatório de desempenho dos técnicos no atendimento aos chamados.', tipo: 'desempenho-tecnico', autor: 'Sistema' },
    { id: 4, titulo: 'Relatório de Clientes Ativos', descricao: 'Relatório de todos os clientes que tiveram atividades no período.', tipo: 'clientes-ativos', autor: 'Sistema' },
    { id: 5, titulo: 'Relatório de Chamados por Prioridade', descricao: 'Análise dos chamados organizados por prioridade no período.', tipo: 'chamados-por-prioridade', autor: 'Sistema' },
    { id: 6, titulo: 'Relatório de Chamados por Setor', descricao: 'Análise dos chamados organizados por setor no período.', tipo: 'chamados-por-setor', autor: 'Sistema' },
  ]);

  const [periodo, setPeriodo] = useState({ inicio: '', fim: '' });
  const [relatorioSelecionado, setRelatorioSelecionado] = useState(null);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsuarioLogado = async () => {
      try {
        const user = await authService.getLoggedUser();
        setUsuarioLogado(user);
      } catch (error) {
        console.error('Erro ao obter usuário logado', error);
      }
    };

    fetchUsuarioLogado();
  }, []);

  const handlePeriodoChange = (e) => {
    const { name, value } = e.target;
    setPeriodo((prev) => ({ ...prev, [name]: value }));
  };

  const handleRelatorioChange = (e) => {
    const { value } = e.target;
    setRelatorioSelecionado(value ? relatoriosDisponiveis.find((r) => r.id === parseInt(value)) : null);
  };

  const handleGerarRelatorio = async () => {
    if (relatorioSelecionado && periodo.inicio && periodo.fim) {
      try {
        let data;
        switch (relatorioSelecionado.tipo) {
          case 'chamados-abertos':
            data = await serviceHome.gerarRelatorioChamadosAbertos(`${periodo.inicio}T00:00:00Z`, `${periodo.fim}T23:59:59Z`);
            break;
          case 'chamados-resolvidos':
            data = await serviceHome.gerarRelatorioChamadosResolvidos(`${periodo.inicio}T00:00:00Z`, `${periodo.fim}T23:59:59Z`);
            break;
          case 'desempenho-tecnico':
            data = await serviceHome.gerarRelatorioDesempenhoTecnico(`${periodo.inicio}T00:00:00Z`, `${periodo.fim}T23:59:59Z`);
            break;
          case 'clientes-ativos':
            data = await serviceHome.gerarRelatorioClientesAtivos(`${periodo.inicio}T00:00:00Z`, `${periodo.fim}T23:59:59Z`);
            break;
          case 'chamados-por-prioridade':
            data = await serviceHome.gerarRelatorioChamadosPorPrioridade(`${periodo.inicio}T00:00:00Z`, `${periodo.fim}T23:59:59Z`);
            break;
          case 'chamados-por-setor':
            data = await serviceHome.gerarRelatorioChamadosPorSetor(`${periodo.inicio}T00:00:00Z`, `${periodo.fim}T23:59:59Z`);
            break;
          default:
            alert('Relatório não implementado.');
            return;
        }
  
        // Gerando o PDF
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('Relatório Gerado', 20, 20);
        doc.setFontSize(16);
        doc.text(`Título: ${relatorioSelecionado.titulo}`, 20, 30);
        doc.setFontSize(12);
        doc.text(`Descrição: ${relatorioSelecionado.descricao}`, 20, 40);
        doc.text(`Tipo: ${relatorioSelecionado.tipo}`, 20, 50);
        doc.text(`Autor: ${relatorioSelecionado.autor}`, 20, 60);
        doc.text(`Período: ${periodo.inicio} a ${periodo.fim}`, 20, 70);
  
        if (Array.isArray(data) && data.length > 0) {
          const tableData = data.map((item, index) => {
            if (typeof item === 'object') {
              // Extrai os valores relevantes do objeto
              return [
                index + 1,
                item.id || '-',
                item.titulo || '-',
                item.descricao || '-',
                item.prioridadeChamado || '-',
                item.setor || '-',
                item.usuario || '-',
                item.atendente || '-',
                item.criacaoChamado ? new Date(item.criacaoChamado).toLocaleString() : '-',
              ];
            }
            return [index + 1, item];
          });
  
          doc.autoTable({
            startY: 80,
            head: [['#', 'ID', 'Título', 'Descrição', 'Prioridade', 'Setor', 'Usuário', 'Atendente', 'Data Criação']],
            body: tableData,
          });
        } else if (typeof data === 'object') {
          // Caso seja um objeto em vez de uma lista, converte os valores do objeto
          const formattedData = Object.entries(data).map(([key, value]) => [key, value]);
          doc.autoTable({
            startY: 80,
            head: [['Chave', 'Valor']],
            body: formattedData,
          });
        } else {
          doc.text('Nenhum dado encontrado para o período selecionado.', 20, 90);
        }
  
        doc.save(`${relatorioSelecionado.titulo}.pdf`);
      } catch (error) {
        console.error('Erro ao gerar relatório', error);
        setError('Erro ao gerar relatório. Veja o console para mais detalhes.');
      }
    } else {
      alert('Por favor, selecione um relatório e preencha o período.');
    }
  };
  

  return (
    <div className="container-dashboard-relatorios">
      <Sidebar />
      <main className="relatorios-main">
        <div className="top-bar">
          <div className="search-bar">
            <input type="text" placeholder="Pesquisar por relatório..." />
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
        <h1>Gerar Relatórios</h1>
        <div className="relatorio-form">
          <select name="relatorio" onChange={handleRelatorioChange}>
            <option value="">Selecione um relatório</option>
            {relatoriosDisponiveis.map((relatorio) => (
              <option key={relatorio.id} value={relatorio.id}>{relatorio.titulo}</option>
            ))}
          </select>
          <input
            type="date"
            name="inicio"
            placeholder="Data de Início"
            value={periodo.inicio}
            onChange={handlePeriodoChange}
          />
          <input
            type="date"
            name="fim"
            placeholder="Data de Fim"
            value={periodo.fim}
            onChange={handlePeriodoChange}
          />
          <button onClick={handleGerarRelatorio}>Gerar Relatório</button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {relatorioSelecionado && (
          <div className="relatorio-detalhes">
            <h3>Detalhes do Relatório Selecionado</h3>
            <p><b>Título:</b> {relatorioSelecionado.titulo}</p>
            <p><b>Descrição:</b> {relatorioSelecionado.descricao}</p>
            <p><b>Tipo:</b> {relatorioSelecionado.tipo}</p>
            <p><b>Autor:</b> {relatorioSelecionado.autor}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Relatorios;
