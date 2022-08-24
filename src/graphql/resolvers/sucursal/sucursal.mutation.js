const resolvers = {
    Mutation: {
        async createSucursal(_, { input }, { models }) {
            try {
                // console.log(input)
                const existeNombre = await models.sucursal.findAll({
                    where: {
                        nombre: input.nombre
                    }
                })
                if (existeNombre.length > 0) {
                    throw new Error("El nombre ya existe")
                }
                await models.sucursal.create(input)
                return true
            } catch (error) {
                throw new Error(error.message)
            }
        },
        async deleteSucursal(_, { id_sucursal }, { models }) {
            try {
                await models.sucursal.destroy({
                    where: {
                        id_sucursal
                    }
                })
                return true
            } catch (error) {
                throw new Error(error.message)
            }
        },
        async editSucursal(_, { input, id_sucursal }, { models }) {
            try {

                const [results, metadata] = await models.sequelize.query(` SELECT * FROM  sucursals WHERE nombre = '${input.nombre}' AND id_sucursal != ${id_sucursal} `)
                if (results.length > 0) {
                    throw new Error("El nombre de la sucursal ya existe");
                }
                await models.sucursal.update(
                    input,
                    {
                        where: {
                            id_sucursal
                        }
                    }
                )
            } catch (error) {
                throw new Error(error.message)
            }
        }
    }
}

module.exports = resolvers