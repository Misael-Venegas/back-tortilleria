const resolvers = {
  Query: {
    async getAlmacen(root, args, { models }) {
      return await models.almacen.findAll();
    },
    async getAlmacenProducto(root, args, { models }) {
      return await models.almacen.findByPk(args.id);
    },
  },

  Mutation: {
    async createAlmacenProducto(root, { input }, { models }) {
      const { nombre, categoria, unidad_Medida, status, stock } = input;
      return await models.almacen.create({
        nombre,
        categoria,
        unidad_Medida,
        status,
        stock,
      });
    },
    async deleteAlmacenProducto(root, args, { models }) {
      return await models.almacen.destroy({
        where: {
          id_Producto_Almacen: args.id_Producto_Almacen,
        },
      });
    },
    async updateAlmacenProducto(root, { input }, { models }) {
      const {
        id_Producto_Almacen,
        nombre,
        categoria,
        unidad_Medida,
        status,
        stock,
      } = input;
      return await models.almacen.update(
        {
          nombre,
          categoria,
          unidad_Medida,
          status,
          stock,
        },
        { where: { id_Producto_Almacen: id_Producto_Almacen } }
      );
    },
  },
};

module.exports = resolvers;
