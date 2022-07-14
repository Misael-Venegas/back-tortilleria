const resolvers = {
    Mutation: {
        async createSucursal(_, { input }, { models }) {
            try {
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