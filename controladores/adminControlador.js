// controladores/adminControlador.js
const Usuario = require('../modelos/usuarioModelo');

exports.crearAdminSiNoExiste = async () => {
  try {
    const adminExiste = await Usuario.findOne({ email: process.env.ADMIN_EMAIL });

    if (!adminExiste) {
      const admin = new Usuario({
        nombreUsuario: process.env.ADMIN_USERNAME,
        nombreCompleto: process.env.ADMIN_NOMBRE,
        email: process.env.ADMIN_EMAIL,
        contraseña: process.env.ADMIN_PASSWORD,
        rol: 'admin'
      });

      await admin.save();
      console.log('Cuenta de administrador creada');
    } else {
      console.log('El administrador ya existe');
      console.log('Admin Username:',process.env.ADMIN_USERNAME)
      console.log('Admin Nombre:',process.env.ADMIN_NOMBRE)
      console.log('Admin Email:',process.env.ADMIN_EMAIL)
      console.log('Admin Password:',process.env.ADMIN_PASSWORD)
    }
  } catch (error) {
    console.error('Error creando la cuenta de administrador:', error);
  }
};
