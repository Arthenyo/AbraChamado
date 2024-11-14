const RecentCallsTable = () => {
    return (
      <div className="recent-called-dashboard">
        <h2>Chamados Recentes</h2>
        <table>
          <thead>
            <tr>
              <th>Assunto</th>
              <th>cliente</th>
              <th>prioridade</th>
              <th>atendente</th>
              <th>setor</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Problema no Sistema</td>
              <td>Empresa ABC</td>
              <td>Alta</td>
              <td>João Silva</td>
              <td>Suporte Técnico</td>
              <td className="warning">Em Andamento</td>
              <td className="primary">detalhes</td>
            </tr>
          </tbody>
        </table>
        <a href="#">mostrar tudo</a>
      </div>
    );
  };
  
  export default RecentCallsTable;