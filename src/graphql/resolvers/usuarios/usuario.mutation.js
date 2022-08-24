const bcryptjs = require("bcryptjs");
const { generarContraseña } = require('../../../helpers/correoElectronico')
const resolvers = {
    Mutation: {
        async createusuario(_, { input }, { models }) {
            const { nombre, apellidoP, apellidoM, telefono, email, password, id_cargo, direccion } = input
            let encriptar = ""
            try {
                if (id_cargo !== 3) {
                    const existeCorreo = await models.empleados.findAll({
                        where: {
                            email
                        }
                    })

                    if (existeCorreo.length > 0) {
                        throw new Error("El correo electronico ya esta vinculado a otra cuenta");
                    }
                    encriptar = await bcryptjs.hash(password, 8);
                }
                await models.empleados.create({ nombre, apellidoP, apellidoM, telefono, email: id_cargo !== 3 ? email : "", password: id_cargo !== 3 ? encriptar : "", id_cargo, direccion })
                return true
            } catch (error) {
                console.log(error)
                throw new Error(error)
            }
        },
        async eliminarUsuario(_, { id_empleado }, { models }) {
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

                if (id_cargo !== 3) {

                    const [results, metadata] = await models.sequelize.query(` SELECT * FROM  empleados WHERE email = '${email}' AND id_empleado != ${id_empleado} `)

                    if (results.length > 0) {
                        throw new Error("El correo electronico ya esta vinculado a otra cuenta");
                    }

                }

                await models.empleados.update({
                    nombre,
                    apellidoP,
                    apellidoM,
                    telefono,
                    email: id_cargo !== 3 ? email : "",
                    id_cargo,
                    direccion
                }, {
                    where: {
                        id_empleado
                    }
                })
                return true
            } catch (error) {
                throw new Error(error.message)
            }

        },
        async cambiarContrasenhia(_, { contrasenhia }, { models, usuario }) {
            try {
                const encriptar = await bcryptjs.hash(contrasenhia, 8);


                await models.empleados.update(
                    {
                        password: encriptar
                    }, {
                    where: {
                        id_empleado: usuario.id_empleado
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
                await models.cargos.create({ id_cargo: 1, nombre_cargo: "Administrador" })

                await models.cargos.create({ id_cargo: 2, nombre_cargo: "Vendedor" })

                await models.cargos.create({ id_cargo: 3, nombre_cargo: "Repartidor" })
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
                    id_empleado: 0,
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
        },
        async generarContrasenhiaTemporal(_, { correo }, { models }) {
            try {
                console.log(correo)
                const obtenerCorreo = await models.empleados.findAll({
                    where: {
                        email: correo
                    }
                })
                // console.log(obtenerCorreo)
                if (obtenerCorreo.length <= 0) {
                    throw new Error("El correo electrónico no se encuentra registrado")
                }
                const password = Math.random().toString(36).slice(-8);
                const encriptar = await bcryptjs.hash(password, 8);
                await generarContraseña(correo, password, obtenerCorreo[0].nombre + " " + obtenerCorreo[0].apellidoP + " " + obtenerCorreo[0].apellidoM);

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
        }
    }
}

module.exports = resolvers