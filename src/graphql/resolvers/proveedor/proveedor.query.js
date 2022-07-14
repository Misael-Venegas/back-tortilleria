const resolvers = {
  Query: {
    async getProveedores(root, args, { models }) {
         return await models.proveedor.findAll();     
    },
  },
};

module.exports = resolvers;
