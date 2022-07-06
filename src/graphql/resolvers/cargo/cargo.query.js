const resolvers = {
    Query: {
        async getAllCargos(_, __, { models }) {
            try {
                return await models.cargos.findAll()
            } catch (error) {
                throw new Error("Error al intentar obtener los cargos")
            }
        }
    }
}

module.exports = resolvers