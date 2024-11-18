import React, { useEffect, useState } from 'react';
import serviceHome from '../../Servicies/service';
import './RecentUpdates.css';

const RecentUpdates = () => {
  const [auditorias, setAuditorias] = useState([]);

  useEffect(() => {
    // Função para obter as auditorias recentes
    const fetchRecentAudits = async () => {
      try {
        const response = await serviceHome.obterAuditoriasRecentes();
        setAuditorias(response); // Já são as 3 mais recentes obtidas do backend
      } catch (error) {
        console.error('Erro ao obter auditorias recentes', error);
      }
    };

    fetchRecentAudits();
  }, []);

  return (
    <div className="recent-updates">
      <h2>Atualizações Recentes</h2>
      <div className="updates">
        {auditorias.length > 0 ? (
          auditorias.map((auditoria) => (
            <div key={auditoria.id} className="update">
              <div className="message">
                <p>
                  <b>{auditoria.usuario}</b>{' '}
                  {auditoria.acao === 'CREATE' ? 'cadastrou' : 'atualizou'} um(a){' '}
                  <b>{auditoria.entidade}</b> em{' '}
                  <b>{new Date(auditoria.timestamp).toLocaleDateString('pt-BR')}</b>.
                </p>
                <small className="text-muted">
                  {new Date(auditoria.timestamp).toLocaleTimeString('pt-BR')}
                </small>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhuma atualização recente disponível.</p>
        )}
      </div>
    </div>
  );
};

export default RecentUpdates;
