const resolvers = {
  Mutation: {
    async createProveedor(root, { input }, { models }) {
      const { nombre, correo, telefono } = input;
      try {
        await models.proveedor.create({ nombre, correo, telefono });
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports.resolvers;
