import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import ThemeToggler from '../../components/themeToggler/ThemeToggler';
import { jsPDF } from 'jspdf';
import './Relatorios.css';

const Relatorios = () => {
  const [relatoriosDisponiveis, setRelatoriosDisponiveis] = useState([
    { id: 1, titulo: 'Relatório de Chamados Abertos', descricao: 'Análise de todos os chamados abertos no período selecionado.', tipo: 'Chamados', autor: 'Sistema' },
    { id: 2, titulo: 'Relatório de Chamados Resolvidos', descricao: 'Análise dos chamados resolvidos no período selecionado.', tipo: 'Chamados', autor: 'Sistema' },
    { id: 3, titulo: 'Relatório de Desempenho por Técnico', descricao: 'Relatório de desempenho dos técnicos no atendimento aos chamados.', tipo: 'Desempenho', autor: 'Sistema' },
  ]);

  const [periodo, setPeriodo] = useState({ inicio: '', fim: '' });
  const [relatorioSelecionado, setRelatorioSelecionado] = useState(null);

  const handlePeriodoChange = (e) => {
    const { name, value } = e.target;
    setPeriodo((prev) => ({ ...prev, [name]: value }));
  };

  const handleRelatorioChange = (e) => {
    const { value } = e.target;
    setRelatorioSelecionado(value ? relatoriosDisponiveis.find((r) => r.id === parseInt(value)) : null);
  };

  const handleGerarRelatorio = () => {
    if (relatorioSelecionado && periodo.inicio && periodo.fim) {
      const doc = new jsPDF();

      doc.setFontSize(16);
      doc.text('Relatório Gerado', 20, 20);
      doc.setFontSize(12);
      doc.text(`Título: ${relatorioSelecionado.titulo}`, 20, 40);
      doc.text(`Descrição: ${relatorioSelecionado.descricao}`, 20, 50);
      doc.text(`Tipo: ${relatorioSelecionado.tipo}`, 20, 60);
      doc.text(`Autor: ${relatorioSelecionado.autor}`, 20, 70);
      doc.text(`Período: ${periodo.inicio} a ${periodo.fim}`, 20, 80);

      doc.save('relatorio_demo.pdf');
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
                <p>Olá, <b>Arthenyo</b></p>
                <small className="text-muted">Admin</small>
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