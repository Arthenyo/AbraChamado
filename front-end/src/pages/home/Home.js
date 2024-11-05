import "./Home.css";
import authServiceInstance from "../../Servicies/authService";
import { useEffect, useState } from "react";

export function Home() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = await authServiceInstance.getLoggedUser();
        if (user && user.nome) {
          setUserName(user.nome);
        } else {
          setUserName("Usuário Desconhecido");
        }
      } catch (error) {
        console.error("Erro ao buscar o usuário logado", error);
        setUserName("Usuário Desconhecido");
      }
    };
    fetchUserName();
  }, []);

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
          <section className="chamados">
            <h2>Chamados Recentes</h2>
            <div>
              <div className="card">
                <div className="barra"></div>
                <div className="conteudo">
                  <h3>Erro no Sistema de Login</h3>
                  <p>
                    Usuário não consegue acessar a plataforma devido a um erro
                    desconhecido. Urgente.
                  </p>
                  <div className="acoes">
                    <button title="Favoritar">
                      <i className="bi bi-star"></i>
                    </button>
                    <button title="Visualizar">
                      <i className="bi bi-eye"></i>
                    </button>
                    <button title="Compartilhar">
                      <i className="bi bi-share"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <script>
        const footer = document.getElementById("texto-footer"); footer.innerText
        = `Arthenyo Carlos, ${new Date().getFullYear()}`;
      </script>
    </div>
  );
}
