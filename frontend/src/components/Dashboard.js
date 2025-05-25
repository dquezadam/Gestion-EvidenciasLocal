import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Button, Grid, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Bienvenido, {user?.tipoUsuario === 'OP_CD' ? 'Operativo CD' : 'Logística Clientes'}
      </Typography>
      
      <Grid container spacing={3}>
        {user?.tipoUsuario === 'OP_CD' && (
          <>
            <Grid item xs={12} md={6}>
              <Button
                component={Link}
                to="/subir-evidencia"
                variant="contained"
                color="primary"
                fullWidth
              >
                Subir Evidencia
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                component={Link}
                to="/mis-reclamos"
                variant="contained"
                color="secondary"
                fullWidth
              >
                Mis Reclamos
              </Button>
            </Grid>
          </>
        )}

        {user?.tipoUsuario === 'LOG_CL' && (
          <>
            <Grid item xs={12} md={6}>
              <Button
                component={Link}
                to="/revisar-reclamos"
                variant="contained"
                color="primary"
                fullWidth
              >
                Revisar Reclamos
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                component={Link}
                to="/generar-cobros"
                variant="contained"
                color="secondary"
                fullWidth
              >
                Generar Cobros
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard;