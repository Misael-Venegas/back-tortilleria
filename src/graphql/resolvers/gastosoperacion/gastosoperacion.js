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
    async deleteGasto(root, args, { models }) {
      return await models.gastosoperacion.destroy({
        where: {
          id_operacion: args.id_operacion,
        },
      });
    },
  },
};

module.exports = resolvers;
