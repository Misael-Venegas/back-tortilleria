const jwt = require("jsonwebtoken");

const crearToken = (usuario) => {
    const { id, nombre, apellidoM, apellidoP, email, telefono, tipo } = usuario;

    console.log(id, nombre, apellidoM, apellidoP, email, telefono, tipo);
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