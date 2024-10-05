// rutas/productoRutas.js
const express = require("express");
const {
  crearProducto,
  obtenerProductos,
  actualizarProducto,
  eliminarProducto,
} = require("../controladores/productoControlador");
const { proteger, soloAdmin } = require("../middlewares/authMiddleware"); // Importar middleware de autenticación
const router = express.Router();

// Ruta protegida para crear productos (solo admin)
router.post("/productos", proteger, soloAdmin, crearProducto);

// Ruta pública para obtener productos
router.get("/productos", obtenerProductos);

// Ruta protegida para actualizar productos (solo admin)
router.put("/productos/:id", proteger, soloAdmin, actualizarProducto);

// Ruta protegida para eliminar productos (solo admin)
router.delete("/productos/:id", proteger, soloAdmin, eliminarProducto);

module.exports = router;
