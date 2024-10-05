// controladores/favoritosControlador.js
const Favoritos = require("../modelos/favoritosModelo");
const Producto = require("../modelos/productoModelo");

exports.obtenerFavoritos = async (req, res) => {
  try {
    const favoritos = await Favoritos.findOne({ usuario: req.usuario._id }).populate("productos");
    if (!favoritos) {
      return res.status(404).json({ mensaje: "No hay productos en favoritos" });
    }
    res.json(favoritos.productos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los favoritos", error });
  }
};

exports.agregarFavorito = async (req, res) => {
  try {
    const productoId = req.params.productoId;
    let favoritos = await Favoritos.findOne({ usuario: req.usuario._id });

    if (!favoritos) {
      favoritos = new Favoritos({ usuario: req.usuario._id, productos: [productoId] });
    } else {
      if (favoritos.productos.includes(productoId)) {
        return res.status(400).json({ mensaje: "El producto ya está en favoritos" });
      }
      favoritos.productos.push(productoId);
    }

    await favoritos.save();
    res.status(201).json({ mensaje: "Producto agregado a favoritos" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al agregar a favoritos", error });
  }
};

exports.eliminarFavorito = async (req, res) => {
  try {
    const productoId = req.params.productoId;
    const favoritos = await Favoritos.findOne({ usuario: req.usuario._id });

    if (!favoritos) {
      return res.status(404).json({ mensaje: "No se encontró la lista de favoritos" });
    }

    favoritos.productos = favoritos.productos.filter((id) => id.toString() !== productoId);
    await favoritos.save();

    res.status(200).json({ mensaje: "Producto eliminado de favoritos" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar de favoritos", error });
  }
};
