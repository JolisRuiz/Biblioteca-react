import React, { useEffect, useState } from 'react';
import { Container, Grid, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Prestamos = () => {
  const navigate = useNavigate();
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    const obtenerLibros = async () => {
      const response = await fetch("https://localhost:7230/Libro");
      const data = await response.json();

      setLibros(data);
    }

    obtenerLibros();
  }, []);

  const [formulario, setFormulario] = useState({
      usuario: {
        usuarioId: 0,
        nombre: ''
      },
      fechaPrestamo: '',
      fechaDevolucion: '',
      estadoPrestamo: {
        estadoPrestamoId: 0,
        nombre: '',
        estado: false
      },
      bibliotecario: {
        usuarioId: 0,
        nombre: ''
      },
      estado: true,
      detallePrestamo: {
        detallePrestamoId: 0,
        libro: {
          libroId: 0,
          titulo: '',
          descripcion: '',
          categoria: {
            categoriaId: 0,
            nombre: '',
            estado: true
          },
          autor: {
            autorId: 0,
            nombre: '',
            estado: false
          },
          estado: true
        },
        cantidad: 0,
        estado: true
      }
  });

  const Registrar = async(data) => {
    await axios.post('https://localhost:7230/Prestamo', formulario)
    .then(response => {
      var respuesta = response
      console.log(respuesta);
      navigate('/Libros');
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    formulario.usuario.usuarioId = data.get('usuarioid');
    formulario.bibliotecario.usuarioId = data.get('bibliotearioid');
    formulario.fechaPrestamo = data.get('fechaprestamo');
    formulario.fechaDevolucion = data.get('fechadevolucion');
    formulario.estadoPrestamo.estadoPrestamoId = data.get('estadoid');
    formulario.detallePrestamo.libro.libroId = data.get('libroid');
    formulario.detallePrestamo.cantidad = data.get('cantidad');
    console.log(formulario);
    Registrar(formulario)
  } 

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <h1>Prestamos</h1>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
              <InputLabel id="libro-label">ID Usuario:</InputLabel>
                <TextField
                  fullWidth
                  id="usuarioid"
                  name="usuarioid"
                />
              </Grid>
              <Grid item xs={6}>
              <InputLabel id="libro-label">ID Bibiotecario:</InputLabel>
                <TextField
                  fullWidth
                  id="bibliotearioid"
                  name="bibliotearioid"
                />
              </Grid>
              <Grid item xs={6}>
              <InputLabel id="libro-label">Fecha Prestamo:</InputLabel>
                <TextField
                  fullWidth
                  id="fechaprestamo"
                  name="fechaprestamo"  
                  type="date"              
                />
              </Grid>
              <Grid item xs={6}>
              <InputLabel id="libro-label">Fecha Devolucion:</InputLabel>
                <TextField
                  fullWidth
                  id="fechadevolucion"
                  name="fechadevolucion"
                  type="date"
                />
              </Grid>
              
              <Grid item xs={12}>
              <InputLabel id="estado-label">Estado Prestamo:</InputLabel>
                <FormControl fullWidth>                  
                  <Select
                    labelId="estado-label"
                    id="estadoid"
                    name="estadoid"
                  >
                    <MenuItem value="0">Seleccionar estado</MenuItem>
                    <MenuItem value="1">Solicitud</MenuItem>
                    <MenuItem value="2">Aprobado</MenuItem>
                    <MenuItem value="3">Rechazado</MenuItem>
                    {/* Aquí puedes generar las opciones del combo con los estados disponibles */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
              <InputLabel id="libro-label">Libro:</InputLabel>
                <FormControl fullWidth>
                  
                  <Select
                    labelId="libro-label"
                    id="libroid"
                    name="libroid"
                  >
                    <MenuItem value="0">Seleccionar libro</MenuItem>
                    {
                      libros.map((libro) => (
                        <MenuItem key={libro.libroId} value={libro.libroId}>{libro.titulo}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={6}>
              <InputLabel id="libro-label">Cantidad:</InputLabel>
                <TextField
                  fullWidth
                  id="cantidad"
                  name="cantidad"
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit">Guardar</Button>
                <Button variant="default">Salir</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Prestamos;
