// rutas/authRutas.js
const express = require('express');
const { registrarUsuario, loginUsuario } = require('../controladores/authControlador');
const { check } = require('express-validator');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post(
  '/registro',
  [
    check('nombreUsuario', 'El nombre de usuario es requerido').not().isEmpty(),
    check('nombreCompleto', 'El nombre completo es requerido').not().isEmpty(),
    check('email', 'Por favor ingresa un email válido').isEmail(),
    check('contraseña', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 })
  ],
  registrarUsuario
);

// Ruta para login de usuarios
router.post(
  '/login',
  [
    check('email', 'Por favor ingresa un email válido').isEmail(),
    check('contraseña', 'La contraseña es requerida').exists()
  ],
  loginUsuario
);

module.exports = router;
