import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';  // <-- Usar useNavigate
import { AuthContext } from '../../contexts/AuthContext';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();  // <-- useNavigate en lugar de useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api-token-auth/', {
        username,
        password,
      });
      
      // Guardar token y datos del usuario
      login({
        id: response.data.user_id,
        tipoUsuario: response.data.tipo_usuario,
      }, response.data.token);

      // Redirigir según el rol
      if (response.data.tipo_usuario === 'OP_CD') {
        navigate('/lista-evidencias');
      } else {
        navigate('/dashboard');
      }

    } catch (err) {
      alert('Error de autenticación: ' + (err.response?.data?.error || 'Credenciales inválidas'));
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>Iniciar Sesión</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Usuario"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Ingresar
        </Button>
      </form>
    </Container>
  );
};

export default Login;