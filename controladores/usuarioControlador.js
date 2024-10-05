// controladores/usuarioControlador.js

const Usuario = require("../modelos/usuarioModelo");

// Obtener los datos del usuario por su ID
exports.obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select("-contraseña");
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    console.error("Error al obtener los datos del usuario", error);
    res.status(500).json({ mensaje: "Error al obtener los datos del usuario" });
  }
};

// Obtener todos los usuarios (solo para admins)
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("-contraseña"); // No mostramos las contraseñas
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener los usuarios", error);
    res.status(500).json({ mensaje: "Error al obtener los usuarios" });
  }
};

// Actualizar los datos del perfil del usuario
exports.actualizarPerfilUsuario = async (req, res) => {
  try {
    const {
      nombreCompleto,
      direccion,
      telefono,
      nombreUsuario,
      email,
      nuevaContraseña,
    } = req.body;

    let usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Actualizar los campos permitidos
    usuario.nombreCompleto = nombreCompleto || usuario.nombreCompleto;
    usuario.direccion = direccion || usuario.direccion;
    usuario.telefono = telefono || usuario.telefono;
    usuario.nombreUsuario = nombreUsuario || usuario.nombreUsuario;
    usuario.email = email || usuario.email;

    // Si se proporciona una nueva contraseña, se actualiza
    if (nuevaContraseña) {
      usuario.contraseña = nuevaContraseña; // La contraseña será hasheada en el middleware 'pre("save")'
    }

    await usuario.save();
    res.json({ mensaje: "Perfil actualizado correctamente", usuario });
  } catch (error) {
    console.error("Error al actualizar el perfil", error);
    res.status(500).json({ mensaje: "Error al actualizar el perfil" });
  }
};
