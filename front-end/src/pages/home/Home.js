// Home.js (React Component)
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import DashboardCards from '../../components/dashboardCards/DashboardCards';
import RecentCallsTable from '../../components/recentCallsTable/RecentCallsTable';
import RightDashboard from '../../components/rightDashboard/RightDashboard';
import serviceHome from '../../Servicies/service';
import './Home.css';

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [chamadosPorStatus, setChamadosPorStatus] = useState({});
  const [chamadosPorDia, setChamadosPorDia] = useState(0);
  const [recentChamados, setRecentChamados] = useState([]);

  // Função para lidar com a mudança na data selecionada
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
  };

  // Função para buscar os dados ao mudar a data
  useEffect(() => {
    if (selectedDate) {
      fetchChamadosData(selectedDate);
    }
  }, [selectedDate]);

  const fetchChamadosData = async (data) => {
    try {
      const statusData = await serviceHome.contarChamadosPorStatus(data);
      const countData = await serviceHome.contarChamadosPorDia(data);
      const lastFiveCalls = await serviceHome.obterUltimosTresChamados();

      setChamadosPorStatus(statusData);
      setChamadosPorDia(countData);
      setRecentChamados(lastFiveCalls);
    } catch (error) {
      console.error('Erro ao buscar dados dos chamados', error);
    }
  };

  return (
    <div className="container-dashboard">
      <Sidebar />
      <main>
        <h1>Dashboard</h1>
        <div className="date-dashboard">
          <input type="date" value={selectedDate} onChange={handleDateChange} />
        </div>
        <DashboardCards chamadosPorDia={chamadosPorDia} chamadosPorStatus={chamadosPorStatus} />
        <RecentCallsTable recentChamados={recentChamados} />
      </main>
      <RightDashboard />
    </div>
  );
};

export default Home;
