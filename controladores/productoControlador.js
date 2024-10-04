const Producto = require('../modelos/productoModelo');

// Crear un producto
exports.crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Leer todos los productos
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un producto
exports.actualizarProducto = async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(productoActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un producto
exports.eliminarProducto = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener productos con paginación y búsqueda
exports.obtenerProductos = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto es la página 1
    const limit = parseInt(req.query.limit) || 6; // Límite de productos por página, por defecto 6
    const query = req.query.query || ''; // Parámetro de búsqueda, por defecto vacío
  
    try {
      const regex = new RegExp(query, 'i'); // Expresión regular para la búsqueda (insensible a mayúsculas)
      
      // Filtrar productos según el nombre, la descripción o la categoría
      const productos = await Producto.find({
        $or: [
          { nombre: { $regex: regex } },
          { descripcion: { $regex: regex } },
          { categoria: { $regex: regex } }
        ]
      })
        .skip((page - 1) * limit)
        .limit(limit);
  
      const totalProductos = await Producto.countDocuments({
        $or: [
          { nombre: { $regex: regex } },
          { descripcion: { $regex: regex } },
          { categoria: { $regex: regex } }
        ]
      });
  
      res.status(200).json({
        productos,
        totalPages: Math.ceil(totalProductos / limit),
        currentPage: page,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  