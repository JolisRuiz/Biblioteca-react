import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Edit, Delete, Book } from '@mui/icons-material';
import { Container, TextField, Grid } from '@mui/material';

const Libros = () => {
  const [libros, setLibros] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    // Aquí realizas la petición para obtener los datos de los libros
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7230/Libro");
        setLibros(response.data);
      } catch (error) {
        console.error('Error al obtener los libros:', error);
      }
    };

    fetchData();
  }, []);

  // Define las columnas del DataTable
  const columns = [
    {
      name: 'Titulo',
      sortable: true,
      selector: row=>row.titulo
    },
    {
      name: 'Categoria',
      selector: row=>row.categoria.nombre
    },
    {
      name: 'Autor',
      selector: row=>row.autor.nombre
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <div>
          <button onClick={() => handleEdit(row.id)}>
            <Edit />
          </button>
          <button onClick={() => handleDelete(row.id)}>
            <Delete />
          </button>
          <button onClick={() => handleViewBooks(row.id)}>
            <Book />
          </button>
        </div>
      ),
    }
  ];

  const filteredItems = libros.filter(
    (item) =>
      item.titulo.toLowerCase().includes(filterText.toLowerCase()) ||
      item.autor.nombre.toLowerCase().includes(filterText.toLowerCase()) ||
      item.categoria.nombre.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleEdit = (id) => {
    console.log(`Editar libro con ID ${id}`);
    // Lógica para editar el libro con el ID proporcionado
  };

  const handleDelete = (id) => {
    console.log(`Eliminar libro con ID ${id}`);
    // Lógica para eliminar el libro con el ID proporcionado
  };

  const handleViewBooks = (id) => {
    console.log(`Ver libros relacionados con el ID ${id}`);
    // Lógica para ver los libros relacionados con el ID proporcionado
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <h1>Lista de Libros</h1>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Buscar por título, autor o categoría"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <DataTable
            columns={columns}
            data={filteredItems}
            pagination
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Libros;
