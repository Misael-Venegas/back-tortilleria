const resolvers = {
  Query: {
    async getAlmacen(_, __, { models }) {
      try {
        return await models.almacen.findAll();
      } catch (error) {
        throw new Error(error.message)
      }
    }, async getAlmacenTipo(_, __, { models }) {
      return await models.tipoalmacen.findAll();
    },
  }

};

module.exports = resolvers;
