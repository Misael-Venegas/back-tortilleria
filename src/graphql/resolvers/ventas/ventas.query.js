const resolvers = {
  Query: {
    async getVentas(root, args, { models }) {
      try {
        return await models.ventas.findAll({
          where: {
            fecha_venta: args.fecha,
          },
        });
      } catch (error) {
        throw new Error("Error al obtner los datos de la bd");
      }
    },
    async getVentasAll(root, args, { models }) {
      try {
        return await models.ventas.findAll();
      } catch (error) {
        throw new Error("Error al obtner los datos de la bd");
      }
    },
  },
};

module.exports = resolvers;
