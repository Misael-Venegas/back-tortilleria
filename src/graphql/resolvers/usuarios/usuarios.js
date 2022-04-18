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
                        email: correo,
                        password: contrasenia
                    }
                })
                if (consulta.length == 0) {
                    throw new Error("Usuario y/o contraseña incorectos")
                } else {
                    return consulta[0]
                }
            } catch (error) {
                throw new Error("Error al intentar obtener datos de la bd")
            }
        }
    },

    Mutation: {
        async createusuario(root, { input }, { models }) {
            const { nombre, apellidoP, apellidoM, telefono, email, password, tipo } = input
            //console.log(nombre, apellidos, telefono, email, password, tipo)
            return await models.usuarios.create({ nombre,apellidoP, apellidoM, telefono, email, password, tipo })
        }
    }
}

module.exports = resolvers