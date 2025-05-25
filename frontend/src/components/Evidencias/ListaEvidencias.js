import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';



const ListaEvidencias = () => {
  const [evidencias, setEvidencias] = useState([]); // <-- Estado para TODAS las evidencias
  const [loading, setLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, evidenciaId: null, nuevoEstado: null });
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Función para actualizar el estado de una evidencia
  const manejarAprobacion = async (evidenciaId, nuevoEstado) => {
    setConfirmDialog({ open: true, evidenciaId, nuevoEstado });
  };

  const confirmarCambioEstado = async () => {
    const { evidenciaId, nuevoEstado } = confirmDialog;
    try {
      await axios.patch(`http://localhost:8000/api/evidencias/${evidenciaId}/`, {
        estado: nuevoEstado
      });
      // Elimina la evidencia de la lista local (solo muestra pendientes)
      setEvidencias(evidencias.filter(ev => ev.id !== evidenciaId));
    } catch (error) {
      console.error('Error al actualizar:', error);
    } finally {
      setConfirmDialog({ open: false, evidenciaId: null, nuevoEstado: null });
    }
  };

  // Obtener evidencias al cargar el componente
  useEffect(() => {
    const fetchEvidencias = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/evidencias/?estado=PEND');
        setEvidencias(response.data);
      } catch (error) {
        console.error('Error al obtener evidencias:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvidencias();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <TableContainer component={Paper}>



      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Fecha de subida</TableCell>
            {user.tipoUsuario === 'LOG_CL' && <TableCell>Acciones</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {evidencias.map((evidencia) => (
            <TableRow key={evidencia.id}>
              <TableCell>
                {evidencia.producto?.nombre || 'Nombre no disponible'}
              </TableCell>
              <TableCell>{evidencia.estado}</TableCell>
              <TableCell>{new Date(evidencia.fecha_subida).toLocaleString()}</TableCell>
              {user.tipoUsuario === 'LOG_CL' && (
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => manejarAprobacion(evidencia.id, 'APROB')}
                    >
                      Aprobar
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => manejarAprobacion(evidencia.id, 'RECHAZ')}
                    >
                      Rechazar
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => navigate(`/detalle-evidencia/${evidencia.id}`, { state: { evidencia } })}
                    >
                      Detalle
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => navigate('/crear-reclamo', { state: { evidencia } })}
                    >
                      Reclamar
                    </Button>
                  </Box>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, evidenciaId: null, nuevoEstado: null })}>
        <DialogTitle>Confirmar acción</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas {confirmDialog.nuevoEstado === 'APROB' ? 'aprobar' : 'rechazar'} esta evidencia? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false, evidenciaId: null, nuevoEstado: null })} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmarCambioEstado} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default ListaEvidencias;