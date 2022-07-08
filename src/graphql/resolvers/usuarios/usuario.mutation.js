const bcryptjs = require("bcryptjs");
const resolvers = {
    Mutation: {
        async createusuario(root, { input }, { models }) {
            const { nombre, apellidoP, apellidoM, telefono, email, password, cargo, direccion } = input
            //console.log(nombre, apellidos, telefono, email, password, tipo)
            try {
                const existeCorreo = await models.empleados.findAll({
                    where: {
                        email
                    }
                })

                if (existeCorreo.length > 0) {
                    throw new Error("El correo electronico ya esta vinculado a otra cuenta");
                }
                const encriptar = await bcryptjs.hash(password, 8);
                await models.empleados.create({ nombre, apellidoP, apellidoM, telefono, email, password: encriptar, id_cargo: cargo, direccion })
                return true
            } catch (error) {
                throw new Error(error)
            }
        },
        async eliminarUsuario(root, { id }, { models }) {
            try {
                await models.usuarios.destroy({
                    where: {
                        id
                    }
                })
                return true
            } catch (error) {
                throw new Error("Error al intentar eliminar al usuario de la bd")
            }
        },
        async editarUsuario(_, { input }, { models }) {
            const { id, nombre, apellidoP, apellidoM, telefono, email, password, tipo } = input

            try {
                if (password === "") {
                    await models.usuarios.update({
                        nombre,
                        apellidoP,
                        apellidoM,
                        telefono,
                        email,
                        tipo
                    }, {
                        where: {
                            id
                        }
                    })
                } else {
                    const encriptar = await bcryptjs.hash(password, 8);
                    await models.usuarios.update({
                        nombre,
                        apellidoP,
                        apellidoM,
                        telefono,
                        email,
                        tipo,
                        password: encriptar
                    }, {
                        where: {
                            id
                        }
                    })
                }
                return true
            } catch (error) {
                throw new Error(error.message)
            }
        }
    }
}

module.exports = resolvers