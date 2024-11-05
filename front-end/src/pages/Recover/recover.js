import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import seta from "../../assets/seta.png";
import "./recover.css";

export function Recover() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRecover = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/oauth2/recover-token", { email });
      setMessage("Email enviado com sucesso! Verifique sua caixa de entrada.");
      setError("");
    } catch (error) {
      setError("Erro ao enviar email. Por favor, tente novamente.");
      setMessage("");
      console.error("Erro ao enviar email", error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <img src={logo} alt="Workflow" />
        <span>Recuperação de Senha</span>
      </header>
      <form onSubmit={handleRecover}>
        <div className="inputContainer">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="exemplo@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="button">
          Enviar <img src={seta} alt="" />
        </button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="footer">
        <p>Lembrou a senha?</p>
        <Link to="/" className="link">
          Acesse sua conta aqui
        </Link>
      </div>
    </div>
  );
}
