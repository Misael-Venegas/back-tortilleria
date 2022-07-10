const bcryptjs = require("bcryptjs");
const resolvers = {
    Mutation: {
        async createusuario(root, { input }, { models }) {
            const { nombre, apellidoP, apellidoM, telefono, email, password, id_cargo, direccion } = input
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
                await models.empleados.create({ nombre, apellidoP, apellidoM, telefono, email, password: encriptar, id_cargo, direccion })
                return true
            } catch (error) {
                console.log(error)
                throw new Error(error)
            }
        },
        async eliminarUsuario(root, { id_empleado }, { models }) {
            try {
                await models.empleados.destroy({
                    where: {
                        id_empleado
                    }
                })
                return true
            } catch (error) {
                throw new Error("Error al intentar eliminar al usuario de la bd")
            }
        },
        async editarUsuario(_, { input }, { models }) {
            const { id_empleado, nombre, apellidoP, apellidoM, telefono, email, id_cargo, direccion } = input
            try {
                await models.empleados.update({
                    nombre,
                    apellidoP,
                    apellidoM,
                    telefono,
                    email,
                    id_cargo,
                    direccion
                }, {
                    where: {
                        id_empleado
                    }
                })
                return true
            } catch (error) {
                throw new Error("Error al intentar editar los campos del usuario " + nombre)
            }
            try {
                return true
            } catch (error) {
                throw new Error(error.message)
            }
        }
    }
}

module.exports = resolvers