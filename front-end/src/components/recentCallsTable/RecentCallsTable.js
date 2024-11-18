// RecentCallsTable.js
import React, { useEffect, useState } from 'react';
import serviceHome from '../../Servicies/service';

const RecentCallsTable = () => {
  const [recentCalls, setRecentCalls] = useState([]);

  useEffect(() => {
    // Função para buscar os últimos cinco chamados
    const fetchRecentCalls = async () => {
      try {
        const data = await serviceHome.obterUltimosTresChamados();
        setRecentCalls(data);
      } catch (error) {
        console.error("Erro ao obter os últimos cinco chamados", error);
      }
    };

    fetchRecentCalls();
  }, []);

  return (
    <div className="recent-called-dashboard">
      <h2>Chamados Recentes</h2>
      <table>
        <thead>
          <tr>
            <th>Assunto</th>
            <th>Cliente</th>
            <th>Prioridade</th>
            <th>Atendente</th>
            <th>Setor</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {recentCalls.length > 0 ? (
            recentCalls.map((chamado) => (
              <tr key={chamado.id}>
                <td>{chamado.titulo}</td>
                <td>{chamado.usuario ? chamado.usuario.nome : 'N/A'}</td>
                <td>{chamado.statusChamado}</td>
                <td>{chamado.atendente ? chamado.atendente.nome : 'N/A'}</td>
                <td>{chamado.setor || 'N/A'}</td> {/* Presumindo que o setor esteja disponível */}
                <td className={`status-${chamado.statusChamado.toLowerCase()}`}>{chamado.statusChamado}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Nenhum chamado recente encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentCallsTable;
