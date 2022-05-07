const resolvers = {
  Query: {
    async getGasto(root, args, { models }) {
      return await models.gastosoperacion.findAll();
    },
  },

  Mutation: {
    async createGasto(root, { input }, { models }) {
      const { id_producto, cantidad, precio, fecha, id_usuario } = input;
      return await models.gastosoperacion.create({
        id_producto,
        cantidad,
        precio,
        fecha,
        id_usuario,
      });
    },
  },
};

module.exports = resolvers;
