// rutas/authRutas.js
const express = require("express");
const {
  registrarUsuario,
  loginUsuario,
  obtenerUsuarioAutenticado,
} = require("../controladores/authControlador");
const { proteger } = require("../middlewares/authMiddleware");
const { check } = require("express-validator");

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post(
  "/registro",
  [
    check("nombreUsuario", "El nombre de usuario es requerido").not().isEmpty(),
    check("nombreCompleto", "El nombre completo es requerido").not().isEmpty(),
    check("email", "Por favor ingresa un email válido").isEmail(),
    check("contraseña", "Una contraseña es requerida"),
  ],
  registrarUsuario
);

// Ruta para login de usuarios
router.post(
  "/login",
  [
    check("email", "Por favor ingresa un email válido").isEmail(),
    check("contraseña", "La contraseña es requerida").exists(),
  ],
  loginUsuario
);

// Nueva ruta para obtener los datos del usuario autenticado
router.get("/me", proteger, obtenerUsuarioAutenticado);

module.exports = router;
