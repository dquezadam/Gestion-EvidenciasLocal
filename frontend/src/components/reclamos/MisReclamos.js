import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

const MisReclamos = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [reclamos, setReclamos] = useState([]);

  useEffect(() => {
    const fetchReclamos = async () => {
      try {
        const response = await axios.get('/api/reclamos/');
        setReclamos(response.data.filter(r => r.usuario.id === user.id));
      } catch (error) {
        // Manejo de error
      }
    };
    fetchReclamos();
  }, [user.id]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Mis Reclamos</Typography>
      <Box mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/crear-reclamo')}
        >
          Generar Nuevo Reclamo
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reclamos.map((reclamo) => (
              <TableRow key={reclamo.id}>
                <TableCell>{reclamo.id}</TableCell>
                <TableCell>{reclamo.producto?.nombre || reclamo.producto}</TableCell>
                <TableCell>{reclamo.descripcion}</TableCell>
                <TableCell>{reclamo.resuelto ? 'Resuelto' : 'Pendiente'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => navigate('/detalle-reclamo', { state: { reclamo } })}
                  >
                    Revisar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MisReclamos;
