// servidor.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productoRutas = require("./rutas/productoRutas");
const authRutas = require("./rutas/authRutas"); // Importar las rutas de autenticación
const { crearAdminSiNoExiste } = require("./controladores/adminControlador"); // Importar el controlador del admin
const usuarioRutas = require("./rutas/usuarioRutas");
require("dotenv").config({ path: "./config.env" });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", productoRutas);
app.use("/api/auth", authRutas); // Agregando las rutas de autenticación
app.use("/api/usuarios", usuarioRutas);

// Conectar a la base de datos
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado a MongoDB");

    // Crear cuenta de administrador si no existe
    crearAdminSiNoExiste();
  })
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
