const bcryptjs = require("bcryptjs");
const { crearToken } = require("../../../helpers/auth")
const resolvers = {
    Query: {
        async getUsuarios(_, __, { models }) {
            const [results, metadata] = await models.sequelize.query(`SELECT emp.id_empleado ,emp.nombre, emp.apellidoP, 
                                        emp.apellidoM,emp.telefono, emp.email, emp.direccion, c.id_cargo, c.nombre_cargo FROM empleados emp 
                                        INNER JOIN cargos c ON c.id_cargo = emp.id_cargo`);
            return results
        },
        async getUsuario(root, args, { models }) {
            return await models.empleados.findByPk(args.id);
        },
        async holaMundo() {
            return await "hola mundo"
        },
        async login(_, args, { models }) {
            try {
                const { correo, contrasenia } = args;

                const consulta = await models.empleados.findAll({
                    where: {
                        email: correo
                    }
                })

                if (consulta.length == 0) {
                    throw new Error("El correo electronico no se encuentra registrado")
                }
                if (consulta[0].id_cargo !== 1 && consulta[0].id_cargo !== 0 && consulta[0].id_cargo !== 2) {
                    throw new Error("No tienes pemisos para ingrear al sistema")
                }
                const validarContrasenhia = await bcryptjs.compare(contrasenia, consulta[0].password);

                if (!validarContrasenhia) {
                    throw new Error("La contrasenhia es incorrecta")
                }

                // console.log("----------------------ERICK------------------")
                // console.log(consulta)

                return {
                    token: crearToken(consulta[0])
                }

            } catch (error) {
                console.log(error)
                throw new Error(error.message)
            }
        }
    }
}

module.exports = resolvers