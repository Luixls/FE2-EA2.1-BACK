// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const Usuario = require("../modelos/usuarioModelo");

exports.proteger = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("Token recibido:", token); // Debug

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = await Usuario.findById(decoded.id).select("-contraseña");

      console.log("Usuario decodificado:", req.usuario); // Debug
      next();
    } catch (error) {
      console.error("Error con el token", error);
      res.status(401).json({ mensaje: "No autorizado, token fallido" });
    }
  } else {
    res.status(401).json({ mensaje: "No autorizado, no se encontró token" });
  }
};

exports.soloAdmin = (req, res, next) => {
  if (req.usuario && req.usuario.rol === "admin") {
    next();
  } else {
    res.status(403).json({ mensaje: "Acceso denegado: solo admins" });
  }
};
