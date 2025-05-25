import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, TextField, Button, Paper, Box, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { AuthContext } from '../../contexts/AuthContext';

const CrearReclamo = () => {
  const [evidencias, setEvidencias] = useState([]);
  const [selectedEvidencia, setSelectedEvidencia] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvidencias = async () => {
      try {
        const response = await axios.get('/api/evidencias/?estado=PEND');
        // Solo evidencias del usuario actual
        setEvidencias(response.data.filter(ev => ev.usuario.id === user.id));
      } catch (error) {
        alert('Error al obtener evidencias');
      } finally {
        setLoading(false);
      }
    };
    fetchEvidencias();
  }, [user.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    try {
      const evidencia = evidencias.find(ev => ev.id === selectedEvidencia);
      await axios.post('/api/reclamos/', {
        producto: evidencia.producto.id || evidencia.producto,
        descripcion,
        evidencia: evidencia.id
      });
      alert('Reclamo enviado correctamente');
      navigate('/mis-reclamos');
    } catch (error) {
      alert('Error al enviar el reclamo');
    } finally {
      setEnviando(false);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Crear Reclamo</Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Evidencia</InputLabel>
            <Select
              value={selectedEvidencia}
              label="Evidencia"
              onChange={e => setSelectedEvidencia(e.target.value)}
              required
            >
              {evidencias.map(ev => (
                <MenuItem key={ev.id} value={ev.id}>
                  {ev.producto?.nombre || 'Producto'} - {new Date(ev.fecha_subida).toLocaleString()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedEvidencia && (
            <Box mb={2}>
              <Typography><b>Archivo original:</b> <a href={evidencias.find(ev => ev.id === selectedEvidencia)?.archivo} target="_blank" rel="noopener noreferrer">Descargar</a></Typography>
            </Box>
          )}
          <TextField
            label="Descripción del reclamo"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" disabled={enviando || !selectedEvidencia}>
            {enviando ? 'Enviando...' : 'Enviar Reclamo'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CrearReclamo;
