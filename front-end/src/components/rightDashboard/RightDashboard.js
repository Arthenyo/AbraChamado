import React from 'react';
import ThemeToggler from '../themeToggler/ThemeToggler';
import RecentUpdates from '../recentUpdates/RecentUpdates';
import './RightDashboard.css';

const RightDashboard = () => {
  return (
    <div className="right-dashboard">
      <div className="top">
        <ThemeToggler />
        <div className="profile">
          <div className="info">
            <p>Olá, <b>Arthenyo</b></p>
            <small className="text-muted">Admin</small>
          </div>
        </div>
      </div>
      <RecentUpdates />
    </div>
  );
};

export default RightDashboard;