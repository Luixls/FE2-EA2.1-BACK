// rutas/usuarioRutas.js
const express = require('express');
const { obtenerUsuarios, obtenerUsuario, actualizarUsuario } = require('../controladores/usuarioControlador');
const { proteger, soloAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta para obtener todos los usuarios (solo para admins)
router.get('/', proteger, soloAdmin, obtenerUsuarios);

// Ruta para obtener un usuario por ID (para perfil propio o admin)
router.get('/:id', proteger, obtenerUsuario);

// Ruta para actualizar un usuario (perfil propio o admin)
router.put('/:id', proteger, actualizarUsuario);

module.exports = router;
