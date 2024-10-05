// modelos/favoritosModelo.js
const mongoose = require("mongoose");

const favoritosEsquema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  productos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producto",
    },
  ],
});

const Favoritos = mongoose.model("Favoritos", favoritosEsquema);
module.exports = Favoritos;
