// Home.js (React Component)
import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import DashboardCards from '../../components/dashboardCards/DashboardCards';
import RecentCallsTable from '../../components/recentCallsTable/RecentCallsTable';
import RightDashboard from '../../components/rightDashboard/RightDashboard';
import './Home.css';

const Home = () => {
  return (
    <div className="container-dashboard">
      <Sidebar />
      <main>
        <h1>Dashboard</h1>
        <div className="date-dashboard">
          <input type="date" />
        </div>
        <DashboardCards />
        <RecentCallsTable />
      </main>
      <RightDashboard />
    </div>
  );
};

export default Home;