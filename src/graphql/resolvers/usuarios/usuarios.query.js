const bcryptjs = require("bcryptjs");
const { crearToken } = require("../../../helpers/auth")
const resolvers = {
    Query: {
        async getUsuarios(root, args, { models }) {
            return await models.empleados.findAll();
        },
        async getUsuario(root, args, { models }) {
            return await models.empleados.findByPk(args.id);
        },
        async holaMundo() {
            return await "hola mundo"
        },
        async login(root, args, { models }) {
            try {
                const { correo, contrasenia } = args;

                const consulta = await models.empleados.findAll({
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
                console.log(consulta.length)
                if (consulta.length <= 0) {
                    console.log("entré")
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
                console.log(error.message)
                throw new Error(error.message)
            }
        }
    }
}

module.exports = resolvers