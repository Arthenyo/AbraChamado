const DashboardCards = () => {
    return (
      <div className="insights-dashboard">
        <div className="called-dashboard">
          <span className="material-icons-sharp">assignment</span>
          <div className="middle">
            <div className="lef">
              <h3>Total Chamados</h3>
              <h1>700</h1>
            </div>
            <div className="progress">
              <svg>
                <circle cx="38" cy="38" r="36"></circle>
              </svg>
              <div className="number">
                <p>81%</p>
              </div>
            </div>
          </div>
          <small className="text-muted">últimas 24 horas</small>
        </div>
        <div className="finished-dashboard">
          <span className="material-icons-sharp">done</span>
          <div className="middle">
            <div className="lef">
              <h3>Finalizados</h3>
              <h1>500</h1>
            </div>
            <div className="progress">
              <svg>
                <circle cx="38" cy="38" r="36"></circle>
              </svg>
              <div className="number">
                <p>60%</p>
              </div>
            </div>
          </div>
          <small className="text-muted">últimas 24 horas</small>
        </div>
        <div className="pending-dashboard">
          <span className="material-icons-sharp">watch_later</span>
          <div className="middle">
            <div className="lef">
              <h3>Pendentes</h3>
              <h1>200</h1>
            </div>
            <div className="progress">
              <svg>
                <circle cx="38" cy="38" r="36"></circle>
              </svg>
              <div className="number">
                <p>40%</p>
              </div>
            </div>
          </div>
          <small className="text-muted">últimas 24 horas</small>
        </div>
      </div>
    );
  };
  
  export default DashboardCards;