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

        },
        async cambiarContrasenhia(_, { email, contrasenhia }, { models }) {
            try {
                const obtenerCorreo = await models.empleados.findAll({
                    where: {
                        email
                    }
                })

                if (obtenerCorreo.length <= 0) {
                    throw new Error("El correo electrónico no se encuentra registrado")
                }

                const encriptar = await bcryptjs.hash(contrasenhia, 8);


                await models.empleados.update(
                    {
                        password: encriptar
                    }, {
                    where: {
                        id_empleado: obtenerCorreo[0].id_empleado
                    }
                }
                )

                return true
            } catch (error) {
                throw new Error(error.message)
            }

        },
        async registrarPrimerAdmin(_, __, { models }) {
            try {

                const existeCorreo = await models.empleados.findAll({
                    where: {
                        email: "admin@gmail.com"
                    }
                })

                if (existeCorreo.length > 0) {
                    return true
                }
                const encriptar = await bcryptjs.hash("admin123", 8);
                await models.empleados.create({
                    id_empleado: 1,
                    nombre: "Admin",
                    apellidoP: "",
                    apellidoM: "",
                    telefono: "",
                    email: "admin@gmail.com",
                    password: encriptar,
                    id_cargo: 0,
                    direccion: ""
                })
                return true
            } catch (error) {
                console.log(error.message)
            }
        }
    }
}

module.exports = resolvers