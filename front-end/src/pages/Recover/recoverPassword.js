import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import logo from "../../assets/logo.png";
import seta from "../../assets/seta.png";
import "./recoverPassword.css";

export function RecoverPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { token } = useParams();

  const handleRecoverPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem. Por favor, tente novamente.");
      return;
    }

    try {
      await axios.put("http://localhost:8080/oauth2/new-password", {
        token,
        password,
      });
      setMessage(
        "Senha atualizada com sucesso! Você pode agora fazer login com sua nova senha."
      );
      setError("");
    } catch (error) {
      setError("Erro ao atualizar senha. Por favor, tente novamente.");
      setMessage("");
      console.error("Erro ao atualizar senha", error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <img src={logo} alt="Workflow" />
        <span>Redefinição de Senha</span>
      </header>
      <form onSubmit={handleRecoverPassword}>
        <div className="inputContainer">
          <label htmlFor="password">Nova Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="button">
          Redefinir Senha <img src={seta} alt="" />
        </button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
