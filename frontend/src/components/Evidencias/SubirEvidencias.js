import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl,
  CircularProgress
} from '@mui/material';

const SubirEvidencia = () => {
  const [productos, setProductos] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [observaciones, setObservaciones] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Obtener lista de productos al cargar el componente
// En el frontend (SubirEvidencia.js), modifica la solicitud:
useEffect(() => {
  const fetchProductos = async () => {
    try {
      const response = await axios.get('/api/productos/', {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      console.log('Respuesta de productos:', response.data); // <-- Agrega esto
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener productos:', error.response?.data);
    }
  };
  fetchProductos();
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append('producto', selectedProducto);
    formData.append('archivo', archivo);
    formData.append('observaciones', observaciones);
    formData.append('estado', 'PEND'); // Estado por defecto pendiente

    try {
      await axios.post('/api/evidencias/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/evidencias'); // Redirigir al listado
      alert('Evidencia subida exitosamente!');
    } catch (error) {
      alert('Error al subir evidencia: ' + (error.response?.data?.detail || ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Subir Nueva Evidencia</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Producto</InputLabel>
          <Select
            value={selectedProducto}
            label="Producto"
            onChange={(e) => setSelectedProducto(e.target.value)}
            required
          >
            {productos.map((producto) => (
              <MenuItem key={producto.id} value={producto.id}>
                {producto.nombre} - (Código: {producto.codigo})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <Button
            variant="contained"
            component="label"
          >
            Seleccionar Archivo
            <input
              type="file"
              hidden
              onChange={(e) => setArchivo(e.target.files[0])}
              required
            />
          </Button>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            {archivo ? archivo.name : 'Ningún archivo seleccionado'}
          </Typography>
        </FormControl>

        <TextField
          label="Observaciones"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
        />

        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Subir Evidencia'}
        </Button>
      </form>
    </Container>
  );
};

export default SubirEvidencia;