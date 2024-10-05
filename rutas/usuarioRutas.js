// rutas/usuarioRutas.js

const express = require("express");
const {
  obtenerUsuario,
  obtenerUsuarios,
  actualizarPerfilUsuario,
} = require("../controladores/usuarioControlador");
const { proteger, soloAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

// Ruta para obtener un usuario por ID (para perfil propio o admin)
router.get("/:id", proteger, obtenerUsuario);

// Ruta para obtener todos los usuarios (solo para admins)
router.get("/", proteger, soloAdmin, obtenerUsuarios);

// Ruta para actualizar un usuario (perfil propio o admin)
router.put("/:id", proteger, actualizarPerfilUsuario);

module.exports = router;
