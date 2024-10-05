// controladores/usuarioControlador.js
const Usuario = require('../modelos/usuarioModelo');

// Obtener todos los usuarios (solo para admins)
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-contraseña');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};

// Obtener un usuario (para perfil propio o admin)
exports.obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-contraseña');
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuario' });
  }
};

// Actualizar un usuario
exports.actualizarUsuario = async (req, res) => {
  const { nombreCompleto, email, contraseña, direccion, telefono } = req.body;

  try {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    usuario.nombreCompleto = nombreCompleto || usuario.nombreCompleto;
    usuario.email = email || usuario.email;
    usuario.direccion = direccion || usuario.direccion;
    usuario.telefono = telefono || usuario.telefono;

    if (contraseña) {
      usuario.contraseña = contraseña;
    }

    await usuario.save();
    res.json({ mensaje: 'Usuario actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar usuario' });
  }
};
