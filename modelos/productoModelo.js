// modelos/productoModelo.js
const mongoose = require('mongoose');

const productoEsquema = new mongoose.Schema({
  nombre: { type: String, required: true },
  categoria: { type: String, required: true },
  descripcion: String,
  precio: { type: Number, required: true },
  cantidad: { type: Number, required: true },
  imagen: String
});

const Producto = mongoose.model('Producto', productoEsquema);

module.exports = Producto;
