// servidor.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productoRutas = require('./rutas/productoRutas');
const authRutas = require('./rutas/authRutas'); // Importa las rutas de autenticación
const { crearAdminSiNoExiste } = require('./controladores/adminControlador'); // Importa el controlador del admin
require('dotenv').config({ path: './config.env' }); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', productoRutas);
app.use('/api/auth', authRutas); // Agrega las rutas de autenticación

// Conectar a la base de datos
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB');
    
    // Crear cuenta de administrador si no existe
    crearAdminSiNoExiste();
  })
  .catch(err => console.error(err));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
