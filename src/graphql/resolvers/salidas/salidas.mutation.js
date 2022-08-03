const resolvers = {
  Mutation: {
    async createSalida(_, { input, inputSalidas }, { models }) {
      const { Fecha, descripcion } = input;
      const { id_almacen, cantidad, id_salida } = inputSalidas;
      const obtenerAlmacen = await models.almacen.findByPk(id_almacen);
      const sumaCantidades = parseFloat(
        obtenerAlmacen.cantidadTotal - cantidad
      );

      try {
        await models.almacen.update(
          {
            cantidadTotal: sumaCantidades,
          },
          {
            where: {
              id_almacen: obtenerAlmacen.id_almacen,
            },
          }
        );
        await models.salidas.create({
          Fecha,
          descripcion,
        });
        await models.salidasalmacen.create({
          id_almacen,
          cantidad,
          id_salida,
        });
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = resolvers;
