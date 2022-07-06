const resolvers = {
    Mutation: {
        async createCargo(_, { nombreCargo }, { models }) {
            try {
                await models.cargos.create({ nombre_cargo: nombreCargo })
                return true
            } catch (error) {
                throw new Error(error.message)
            }
        }
    }
}
module.exports = resolvers