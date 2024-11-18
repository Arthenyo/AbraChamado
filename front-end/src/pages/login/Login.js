// Login.js
import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import authServiceInstance from '../../Servicies/authService'; // Importando o serviço de autenticação

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Utilizando o serviço de autenticação para fazer o login
      await authServiceInstance.login(email, password);
      // Se o login for bem-sucedido, redireciona para a página inicial
      navigate('/home');
    } catch (error) {
      // Caso haja um erro, exibe uma mensagem de erro
      setErrorMessage('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
