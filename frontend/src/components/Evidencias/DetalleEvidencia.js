import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Paper, Box } from '@mui/material';

const DetalleEvidencia = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const evidencia = location.state?.evidencia;

  if (!evidencia) {
    return <Typography variant="h6">No hay datos de la evidencia.</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Detalle de Evidencia</Typography>
        <Box mb={2}>
          <Typography><b>Usuario:</b> {evidencia.usuario}</Typography>
          <Typography><b>Producto:</b> {evidencia.producto?.nombre || evidencia.producto}</Typography>
          <Typography><b>Fecha de subida:</b> {new Date(evidencia.fecha_subida).toLocaleString()}</Typography>
          <Typography><b>Estado:</b> {evidencia.estado}</Typography>
          <Typography><b>Observaciones:</b> {evidencia.observaciones || 'Sin observaciones'}</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          href={evidencia.archivo}
          target="_blank"
          rel="noopener noreferrer"
        >
          Descargar Archivo
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

export default DetalleEvidencia;
