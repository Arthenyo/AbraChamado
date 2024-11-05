import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import seta from "../../assets/seta.png";
import "./login.css";
import AuthService from "../../Servicies/authService"; // Ajuste o caminho conforme necessário

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await AuthService.login(email, password);
      navigate("/home"); // Redireciona para a página inicial após o login bem-sucedido
    } catch (error) {
      console.error("Erro ao fazer login", error);
      alert("Falha no login. Por favor, tente novamente.");
    }
  };

  return (
    <div className="container">
      <header className="header">
        <img src={logo} alt="Workflow" />
        <span>Bem Vindo ao abraaaa-Chamado</span>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="exemplo@gmail.com"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <div className="inputContainer">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <Link to="/recover" className="link">
          Esqueci a senha
        </Link>

        <button type="submit" className="button">
          Entrar <img src={seta} alt="" />
        </button>
      </form>
    </div>
  );
}
