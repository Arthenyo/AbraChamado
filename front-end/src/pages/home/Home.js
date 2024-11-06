import "./Home.css";
import authServiceInstance from "../../Servicies/authService";
import { useEffect, useState } from "react";
import serviceHome from "../../Servicies/serviceHome";

export function Home() {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(null);
  const [totalChamados, setTotalChamados] = useState(0);
  const [totalChamadosAbertos, setTotalChamadosAbertos] = useState(0);
  const [totalChamadosFinalizados, setTotalChamadosFinalizados] = useState(0);
  const [recentChamados, setRecentChamados] = useState([]);
  const [avisos, setAvisos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChamado, setSelectedChamado] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await authServiceInstance.getLoggedUser();
        if (user) {
          setUserName(user.nome);
          setUserId(user.id);
        } else {
          setUserName("Usuário Desconhecido");
        }
      } catch (error) {
        console.error("Erro ao buscar o usuário logado", error);
        setUserName("Usuário Desconhecido");
      }
    };

    const fetchTotalChamados = async () => {
      try {
        const total = await serviceHome.getTotalChamados();
        setTotalChamados(total);
      } catch (error) {
        console.error("Erro ao buscar total de chamados", error);
      }
    };

    const fetchTotalChamadosAbertos = async () => {
      try {
        const totalAbertos = await serviceHome.getTotalChamadosAbertos();
        setTotalChamadosAbertos(totalAbertos);
      } catch (error) {
        console.error("Erro ao buscar total de chamados abertos", error);
      }
    };

    const fetchTotalChamadosFinalizados = async () => {
      try {
        const totalFinalizados =
          await serviceHome.getTotalChamadosFinalizados();
        setTotalChamadosFinalizados(totalFinalizados);
      } catch (error) {
        console.error("Erro ao buscar total de chamados finalizados", error);
      }
    };

    const fetchTop5ChamadosAbertos = async () => {
      try {
        const chamados = await serviceHome.getTop5ChamadosAbertos();
        setRecentChamados(chamados);
      } catch (error) {
        console.error("Erro ao buscar os top 5 chamados abertos", error);
      }
    };

    const fetchUltimasAnotacoes = async () => {
      try {
        const anotacoes = await serviceHome.getUltimasAnotacoes();
        setAvisos(anotacoes);
      } catch (error) {
        console.error("Erro ao buscar as últimas anotações", error);
      }
    };

    fetchUserData();
    fetchTotalChamados();
    fetchTotalChamadosAbertos();
    fetchTotalChamadosFinalizados();
    fetchTop5ChamadosAbertos();
    fetchUltimasAnotacoes();
  }, []);

  const handleLogout = () => {
    authServiceInstance.logout();
    // Redirecionar para a página de login após o logout
    window.location.href = "/";
  };

  const renderAvisos = () => {
    if (avisos.length === 0) {
      return <p>Nenhum aviso disponível no momento.</p>;
    }
    const avisosFixos = avisos.filter((aviso) => aviso.fixo);
    const avisosNaoFixos = avisos.filter((aviso) => !aviso.fixo);
    const avisosParaMostrar = [
      ...avisosFixos,
      ...avisosNaoFixos.slice(0, 5 - avisosFixos.length),
    ];
    return (
      <ul>
        {avisosParaMostrar.map((aviso, index) => (
          <li
            key={index}
            style={{ fontWeight: aviso.fixo ? "bold" : "normal" }}
          >
            {aviso.anotacao}
          </li>
        ))}
      </ul>
    );
  };

  const handleFavoritar = async (chamado) => {
    try {
      await serviceHome.toggleFavoritarChamado(userId, chamado.id);

      // Atualiza o status de favorito localmente
      const updatedChamados = recentChamados.map((c) =>
        c.id === chamado.id
          ? {
              ...c,
              favoritadoPor:
                c.favoritadoPor && c.favoritadoPor.includes(userName)
                  ? c.favoritadoPor.filter((nome) => nome !== userName)
                  : [...(c.favoritadoPor || []), userName],
            }
          : c
      );
      setRecentChamados(updatedChamados);
    } catch (error) {
      console.error("Erro ao favoritar/desfavoritar o chamado", error);
    }
  };

  const handleVisualizar = (chamado) => {
    setSelectedChamado(chamado);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedChamado(null);
  };

  const handleCompartilhar = (chamado) => {
    const link = `https://meusistema.com/chamados/${chamado.id}`;
    navigator.clipboard.writeText(link).then(
      () => {
        console.log(
          `Link do chamado ${chamado.titulo} copiado para a área de transferência.`
        );
        alert(
          `Link do chamado ${chamado.titulo} copiado para a área de transferência.`
        );
      },
      (error) => {
        console.error("Erro ao copiar o link", error);
      }
    );
  };

  return (
    <div>
      <div id="content">
        <header>
          <div className="busca">
            <form action="">
              <input type="text" placeholder="Pesquisar Chamados" />
              <button type="submit" title="Buscar">
                <i className="bi bi-search"></i>
              </button>
            </form>
            <div className="perfil">
              <p>{userName}</p>
              <button
                onClick={handleLogout}
                className="logout-button"
                title="Sair"
              >
                Sair
              </button>
            </div>
          </div>
          <div className="saudacao">
            <div className="perfil">
              <span>Olá,</span>
              <p>{userName}</p>
            </div>
            <div className="acoes">
              <button>Novo Chamado</button>
            </div>
          </div>
        </header>
        <aside>
          <div className="logo">
            <i className="bi bi-headset"></i>
            <h1>Abrir Chamado</h1>
          </div>
          <ul className="menu">
            <li className="selecionado">
              <a href="#">
                <i className="bi bi-house"></i>Início
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-file-earmark-plus"></i>Novo Chamado
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-card-checklist"></i>Meus Chamados
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-graph-up"></i>Relatórios
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-gear"></i>Configurações
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-star-fill"></i>Chamados Favoritos
              </a>
            </li>
          </ul>
          <footer>
            <p id="texto-footer">Arthenyo Carlos</p>
            <div className="links">
              <a
                href="https://github.com/luana/"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
              >
                <i className="bi bi-github"></i>
              </a>
              <a
                href="https://linkedin.com/in/luana/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </footer>
        </aside>
        <main>
          <section className="impacto">
            <div className="cards-impacto">
              <div className="card-impacto">
                <h3>Total de Chamados</h3>
                <p>{totalChamados}</p>
              </div>
              <div className="card-impacto">
                <h3>Chamados em Aberto</h3>
                <p>{totalChamadosAbertos}</p>
              </div>
              <div className="card-impacto">
                <h3>Chamados Resolvidos</h3>
                <p>{totalChamadosFinalizados}</p>
              </div>
            </div>
            <div className="quadro-avisos">
              <h2>Quadro de Avisos</h2>
              {renderAvisos()}
            </div>
          </section>
          <section className="chamados">
            <h2>Chamados Recentes</h2>
            <div
              className="scrollable-chamados"
              style={{
                maxHeight: "400px",
                overflowY: "scroll",
                display: "grid",
                gap: "16px",
              }}
            >
              {recentChamados.map((chamado, index) => (
                <div key={index} className="card">
                  <div className="barra"></div>
                  <div className="conteudo">
                    <h3>{chamado.titulo}</h3>
                    <p>{chamado.descricao}</p>
                    <div className="acoes">
                      <button
                        title="Favoritar"
                        onClick={() => handleFavoritar(chamado)}
                        style={{
                          color:
                            chamado.favoritadoPor &&
                            chamado.favoritadoPor.includes(userName)
                              ? "yellow"
                              : "inherit",
                        }}
                      >
                        <i className="bi bi-star"></i>
                      </button>
                      <button
                        title="Visualizar"
                        onClick={() => handleVisualizar(chamado)}
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      <button
                        title="Compartilhar"
                        onClick={() => handleCompartilhar(chamado)}
                      >
                        <i className="bi bi-share"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-header">
            <h3>Detalhes do Chamado</h3>
            <button onClick={handleCloseModal}>&times;</button>
          </div>
          <div className="modal-content">
            <h4>{selectedChamado.titulo}</h4>
            <p>{selectedChamado.descricao}</p>
          </div>
          <div className="modal-footer">
            <button onClick={handleCloseModal}>Fechar</button>
          </div>
        </div>
      )}

      <script>
        const footer = document.getElementById("texto-footer"); footer.innerText
        = `Arthenyo Carlos, ${new Date().getFullYear()}`;
      </script>
    </div>
  );
}
