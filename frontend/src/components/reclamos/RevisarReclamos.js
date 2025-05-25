import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RevisarReclamos = () => {
  const [reclamos, setReclamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resolviendo, setResolviendo] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, reclamoId: null, evidenciaId: null });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReclamos = async () => {
      try {
        const response = await axios.get('/api/reclamos/');
        // Solo mostrar los no resueltos
        setReclamos(response.data.filter(r => !r.resuelto));
      } catch (error) {
        alert('Error al obtener reclamos');
      } finally {
        setLoading(false);
      }
    };
    fetchReclamos();
  }, []);

  const resolverReclamo = async (reclamoId, evidenciaId) => {
    setResolviendo(reclamoId);
    try {
      await axios.patch(`/api/reclamos/${reclamoId}/`, { resuelto: true });
      // Usar el id correcto de la evidencia
      const idEvidencia = evidenciaId || (reclamos.find(r => r.id === reclamoId)?.evidencia || reclamos.find(r => r.id === reclamoId)?.evidencia_obj?.id);
      if (idEvidencia) {
        await axios.patch(`/api/evidencias/${idEvidencia}/`, { estado: 'APROB' });
      }
      setReclamos(reclamos.filter(r => r.id !== reclamoId));
    } catch (error) {
      alert('Error al resolver el reclamo');
    } finally {
      setResolviendo(null);
    }
  };

  const handleConfirmarResolucion = () => {
    resolverReclamo(confirmDialog.reclamoId, confirmDialog.evidenciaId);
    setConfirmDialog({ open: false, reclamoId: null, evidenciaId: null });
  };

  if (loading) return <CircularProgress />;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Revisar Reclamos</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reclamos.map((reclamo) => (
              <TableRow key={reclamo.id}>
                <TableCell>{reclamo.id}</TableCell>
                <TableCell>{reclamo.usuario?.username || reclamo.usuario}</TableCell>
                <TableCell>{reclamo.producto?.nombre || reclamo.producto}</TableCell>
                <TableCell>{reclamo.descripcion}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => navigate('/detalle-reclamo', { state: { reclamo } })}
                  >
                    Revisar
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    disabled={resolviendo === reclamo.id}
                    onClick={() => setConfirmDialog({ open: true, reclamoId: reclamo.id, evidenciaId: reclamo.evidencia || (reclamo.evidencia_obj && reclamo.evidencia_obj.id) })}
                  >
                    {resolviendo === reclamo.id ? 'Resolviendo...' : 'Marcar como Resuelto'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, reclamoId: null, evidenciaId: null })}>
        <DialogTitle>Confirmar resolución</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas marcar este reclamo como resuelto? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false, reclamoId: null, evidenciaId: null })} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmarResolucion} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RevisarReclamos;
