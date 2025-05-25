import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { Button, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

const GenerarCobro = () => {
  const [reclamosResueltos, setReclamosResueltos] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, reclamoId: null });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchReclamosResueltos = async () => {
      try {
        const response = await axios.get('/api/reclamos/');
        setReclamosResueltos(response.data.filter(r => r.resuelto));
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchReclamosResueltos();
  }, []);

  const handleGenerarCobro = async (reclamoId) => {
    try {
      const response = await axios.get(
        `/api/cobros/generar-cobro/${reclamoId}/`,
        { responseType: 'blob' }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `cobro_${reclamoId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error al generar cobro:', error);
      alert('No se pudo generar el cobro');
    }
  };

  const handleEliminarReclamo = async (reclamoId) => {
    try {
      await axios.delete(`/api/reclamos/${reclamoId}/`);
      setReclamosResueltos(reclamosResueltos.filter(r => r.id !== reclamoId));
    } catch (error) {
      alert('Error al eliminar el reclamo');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Generar Cobros</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Reclamo</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reclamosResueltos.map((reclamo) => (
              <TableRow key={reclamo.id}>
                <TableCell>{reclamo.id}</TableCell>
                <TableCell>{reclamo.usuario?.username || reclamo.usuario}</TableCell>
                <TableCell>{reclamo.producto?.nombre || reclamo.producto}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => handleGenerarCobro(reclamo.evidencia || (reclamo.evidencia_obj && reclamo.evidencia_obj.id))}
                  >
                    Generar Cobro
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => setConfirmDialog({ open: true, reclamoId: reclamo.id })}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, reclamoId: null })}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas eliminar este reclamo? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false, reclamoId: null })} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => { handleEliminarReclamo(confirmDialog.reclamoId); setConfirmDialog({ open: false, reclamoId: null }); }} color="error" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GenerarCobro;