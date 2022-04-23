const jwt = require("jsonwebtoken");

const crearToken = (usuario) => {
    const { id, nombre, apellidoM, apellidoP, email, telefono, tipo } = usuario;

    return jwt.sign({
        id,
        nombre,
        apellidoM,
        apellidoP,
        email,
        telefono,
        tipo
    },
        'QlkshioASLKÑJDaa234#4klhjas',
        {
            expiresIn: '24h'
        }
    )
}

module.exports = { crearToken }