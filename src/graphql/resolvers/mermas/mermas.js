const resolvers = {
  Query: {
    async getMermas(root, args, { models }) {
      return await models.mermas.findAll();
    },
    async getMerma(root, args, { models }) {
      return await models.mermas.findByPk(args.id);
    },
  },

  Mutation: {
    async createMerma(root, { input }, { models }) {
      const { tipo, cantidad, descripcion, id_usuario, fecha } = input;
      return await models.mermas.create({
        tipo,
        cantidad,
        descripcion,
        id_usuario,
        fecha,
      });
    },
    async deleteMerma(root, args, { models }) {
      return await models.mermas.destroy({
        where: {
          id_merma: args.id_merma,
        },
      });
    },
  },
};

module.exports = resolvers;
