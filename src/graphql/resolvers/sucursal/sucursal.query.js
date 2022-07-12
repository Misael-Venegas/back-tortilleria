const resolvers = {
    Query: {
        async getAllSucursales(_, __, { models }) {
            try {
                return await models.sucursal.findAll();
            } catch (error) {
                throw new Error("Error al intentar obtener las sucursales");
            }
        }
    }
}

module.exports = resolvers