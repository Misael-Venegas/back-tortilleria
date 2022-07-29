const jwt = require("jsonwebtoken");

const crearToken = (usuario) => {
    const { id_empleado, nombre, apellidoM, apellidoP, email, telefono, tipo, id_cargo } = usuario;

 
    return jwt.sign({
        id_empleado,
        nombre,
        apellidoM,
        apellidoP,
        email,
        telefono,
        tipo,
        id_cargo
    },
        'QlkshioASLKÑJDaa234#4klhjas',
        {
            expiresIn: '24h'
        }
    )
}

module.exports = { crearToken }