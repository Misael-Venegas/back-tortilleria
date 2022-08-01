const resolvers = {
  Mutation: {
    async createEntradas(_, { input }, { models }) {
      const { cantidad, id_tipo_almacen, id_proveedor, fechaRegistro, id_almacen } = input

      try {
        const obtenerAlmacen = await models.almacen.findByPk(id_almacen)
        const sumaCantidades = parseInt(obtenerAlmacen.cantidadTotal + cantidad);
        await models.almacen.update({
          cantidadTotal: sumaCantidades
        }, {
          where: {
            id_almacen: obtenerAlmacen.id_almacen
          }
        })

        await models.entrada.create(
          {
            cantidad,
            id_tipo_almacen,
            id_proveedor,
            fechaRegistro,
            id_almacen
          }
        )

        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = resolvers;
