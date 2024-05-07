const express = require('express');
require('dotenv').config();
const cors = require('cors');

// Crear servidor express
const app = express();

// Definir puerto
const PORT = process.env.PORT || 3000;

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/files', require('./routes/files.route'));

app.listen(PORT, () => {
    console.log('Server Init Port', process.env.PORT);
});

module.exports = app;