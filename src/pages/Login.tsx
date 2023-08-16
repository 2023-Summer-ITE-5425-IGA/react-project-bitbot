import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (value: boolean) => void;
  loginStatus: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, loginStatus }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Reset previous errors
    setLoginError('');
  
    // Basic validation
    if (!username.trim()) {
      setLoginError('Username is required');
      return;
    }
  
    if (!password.trim()) {
      setLoginError('Password is required');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8080/login', {
        username,
        password,
      });
  
      if (response.data.auth) {
        onLogin(true);
  
        localStorage.setItem('token', response.data.token);
        navigate('/codecell');
      } else {
        onLogin(false);
        setLoginError('Username or password is incorrect');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Username or password is incorrect');
    }
  };
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="centered-content">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {loginError && <p className="error-message">{loginError}</p>}
        <button type="button" className="btn btn-danger" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
