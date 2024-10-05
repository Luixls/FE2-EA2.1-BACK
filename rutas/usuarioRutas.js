// rutas/usuarioRutas.js
const express = require("express");
const {
  obtenerUsuario,
  actualizarPerfilUsuario,
} = require("../controladores/usuarioControlador"); // Renombrado
const { proteger, soloAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

// Ruta para obtener un usuario por ID (para perfil propio o admin)
router.get("/:id", proteger, obtenerUsuario);

// Ruta para actualizar un usuario (perfil propio o admin)
router.put("/:id", proteger, actualizarPerfilUsuario); // Renombrado

module.exports = router;
