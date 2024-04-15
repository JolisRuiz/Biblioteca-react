import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom'; 

const Menu = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Biblioteca
        </Typography>
        <Button component={Link} to="/libros" color="inherit">Libros</Button>
        <Button component={Link} to="/prestamos" color="inherit">Préstamos</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
