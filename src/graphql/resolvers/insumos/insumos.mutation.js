const resolvers = {
  Mutation: {
    async createInsumo(root, { input }, { models }) {
      const { descripcion, unidad_medida, id_tipo_almacen } = input;
      try {
        await models.insumos.create({
          descripcion,
          unidad_medida,
          id_tipo_almacen,
        });
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async updateInsumo(root, { input }, { models }) {
      const { descripcion, unidad_medida, id_tipo_almacen, id_insumos } = input;
      try {
        await models.insumos.update(
          { descripcion, unidad_medida, id_tipo_almacen },
          {
            where: {
              id_insumos,
            },
          }
        );
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async deleteInsumo(root, { id_insumos }, { models }) {
      try {
        await models.insumos.destroy({
          where: {
            id_insumos,
          },
        });
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
module.exports = resolvers;
