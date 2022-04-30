const resolvers = {
    Query: {

        async getProductos(_, __, { models }) {
            try {
                return await models.productos.findAll();
            } catch (error) {
                throw new Error("Error al obtner los datos de la bd")
            }
        }

    }
}

module.exports = resolvers