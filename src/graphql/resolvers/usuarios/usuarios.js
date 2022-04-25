const bcryptjs = require("bcryptjs");
const { crearToken } = require("../../../helpers/auth")
const resolvers = {
    Query: {
        async getUsuarios(root, args, { models }) {
            return await models.usuarios.findAll();
        },
        async getUsuario(root, args, { models }) {
            return await models.usuarios.findByPk(args.id);
        },
        async holaMundo() {
            return await "hola mundo"
        },
        async login(root, args, { models }) {
            try {
                const { correo, contrasenia } = args;

                const consulta = await models.usuarios.findAll({
                    where: {
                        email: correo
                    }
                })

                if (consulta.length == 0) {
                    throw new Error("El correo electronico no se encuentra registrado")
                } else {

                    const validarContrasenhia = await bcryptjs.compare(contrasenia, consulta[0].password);

                    if (!validarContrasenhia) {
                        throw new Error("La contrasenhia es incorrecta")
                    }

                    return {
                        token: crearToken(consulta[0])
                    }
                }
            } catch (error) {
                console.log(error)
                throw new Error(error.message)
            }
        },
        async recuperarContranhia(root, args, { models }) {
            const { correo } = args;
            try {
                const consulta = await models.usuarios.findAll(
                    {
                        where: {
                            email: correo
                        }
                    }
                )

                if (consulta.length == 0) {
                    throw new Error("El correo electrónico no existe")
                }

                const passwordNuevo = Math.random().toString(36).slice(-8);

                const encriptPass = await bcryptjs.hash(passwordNuevo, 8);

                console.log(passwordNuevo)
                await models.usuarios.update({ 'password': encriptPass }, {
                    where: {
                        email: correo
                    }
                }
                )
                return true;

            } catch (error) {
                throw new Error(error.message)
            }
        }
    },

    Mutation: {
        async createusuario(root, { input }, { models }) {
            const { nombre, apellidoP, apellidoM, telefono, email, password, tipo } = input
            //console.log(nombre, apellidos, telefono, email, password, tipo)
            try {
                const existeCorreo = await models.usuarios.findAll({
                    where: {
                        email
                    }
                })

                if (existeCorreo.length > 0) {
                    throw new Error("El correo electronico ya esta vinculado a otra cuenta");
                }
                const encriptar = await bcryptjs.hash(password, 8);
                return await models.usuarios.create({ nombre, apellidoP, apellidoM, telefono, email, password: encriptar, tipo })
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
        }
    }
}

module.exports = resolvers