import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Box, Button } from '@mui/material';

const DetalleReclamo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reclamo = location.state?.reclamo;
  const evidencia = reclamo?.evidencia_obj || {};

  if (!reclamo) {
    return <Typography variant="h6">No hay datos del reclamo.</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Detalle del Reclamo</Typography>
        <Box mb={2}>
          <Typography><b>Usuario:</b> {reclamo.usuario?.username || reclamo.usuario}</Typography>
          <Typography><b>Producto:</b> {reclamo.producto?.nombre || reclamo.producto}</Typography>
          <Typography><b>Descripción del reclamo:</b> {reclamo.descripcion}</Typography>
          <Typography><b>Estado del reclamo:</b> {reclamo.resuelto ? 'Resuelto' : 'Pendiente'}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h6">Datos de la Evidencia</Typography>
          <Typography><b>ID Evidencia:</b> {evidencia.id || reclamo.evidencia}</Typography>
          <Typography><b>Fecha de subida:</b> {evidencia.fecha_subida ? new Date(evidencia.fecha_subida).toLocaleString() : ''}</Typography>
          <Typography><b>Estado evidencia:</b> {evidencia.estado}</Typography>
          <Typography><b>Observaciones:</b> {evidencia.observaciones || 'Sin observaciones'}</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          href={evidencia.archivo || reclamo.archivo}
          target="_blank"
          rel="noopener noreferrer"
        >
          Descargar Archivo Evidencia
        </Button>
        <Button
          variant="outlined"
          sx={{ ml: 2 }}
          onClick={() => navigate(-1)}
        >
          Volver
        </Button>
      </Paper>
    </Container>
  );
};

export default DetalleReclamo;
