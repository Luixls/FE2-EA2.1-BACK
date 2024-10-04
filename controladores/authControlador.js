// controladores/authControlador.js
const Usuario = require('../modelos/usuarioModelo');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// Función para generar el token JWT
const generarToken = (usuarioId) => {
  return jwt.sign({ id: usuarioId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Registro de usuarios
exports.registrarUsuario = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { nombreUsuario, nombreCompleto, email, contraseña, confirmarContraseña } = req.body;

  try {
    if (contraseña !== confirmarContraseña) {
      return res.status(400).json({ mensaje: 'Las contraseñas no coinciden' });
    }

    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    usuario = new Usuario({
      nombreUsuario,
      nombreCompleto,
      email,
      contraseña
    });

    await usuario.save();

    const token = generarToken(usuario._id);
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Login de usuarios
exports.loginUsuario = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    const esMatch = await usuario.compararContraseña(contraseña);
    if (!esMatch) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    const token = generarToken(usuario._id);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};
