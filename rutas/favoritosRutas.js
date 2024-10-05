// rutas/favoritosRutas.js
const express = require("express");
const { proteger } = require("../middlewares/authMiddleware");
const {
  obtenerFavoritos,
  agregarFavorito,
  eliminarFavorito,
} = require("../controladores/favoritosControlador");

const router = express.Router();

// Ruta para obtener los productos favoritos del usuario
router.get("/", proteger, obtenerFavoritos);

// Ruta para agregar un producto a favoritos
router.post("/:productoId", proteger, agregarFavorito);

// Ruta para eliminar un producto de favoritos
router.delete("/:productoId", proteger, eliminarFavorito);

module.exports = router;
