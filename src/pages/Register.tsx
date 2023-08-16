import React, { useState } from 'react';
import './register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface RegisterProps {
  onRegister: (username: string, password: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const handleRegister = async () => {
    // Reset previous errors
    setUsernameError('');
    setPasswordError('');
  
    // Basic validation
    if (!username.trim()) {
      setUsernameError('Username is required');
      return;
    }
  
    if (!password.trim()) {
      setPasswordError('Password is required');
      return;
    }
  
    if (password.length < 8) { // Adjust the minimum character requirement as needed
      setPasswordError('Password must be at least 8 characters long');
      return;
    }
  
    try {

      const response = await axios.post('http://localhost:8080/register', {
        username,
        password,
      });
  
  
  
      navigate('/login');
    } catch (error:any) {

      console.log('Registration error:', error.response);
  
      if (error) {
        const errorMessage = error.response.data.error;
  
        // Check for duplicate username error
        if (errorMessage.includes('Username already taken')) {
          setUsernameError('Username already exists');
        }
      } else {
        
      }
    }
  };
  
  return (
    <div className="register-container">
      <h2>Register</h2>
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
          {usernameError && <p className="error-message">{usernameError}</p>}
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
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleRegister}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
