const resolvers = {
  Query: {
    async getMermas(root, args, { models }) {
      const [results, metadata] =  await models.sequelize.query(`
        SELECT m.id_merma, m.cantidad, m.id_tipo_merma, m.id_sucursal, tm.tipo tipo_merma, s.nombre sucursal from mermas m
        INNER JOIN tipo_mermas tm on tm.id_tipo_merma=m.id_tipo_merma
        INNER JOIN sucursals s ON s.id_sucursal=m.id_sucursal`);
      return results;  
      //return await models.mermas.findAll();
    },
    async getMerma(root, args, { models }) {
      return await models.mermas.findByPk(args.id);
    },
    async getTipoMermas(root, args, { models }){
      return await models.tipo_merma.findAll();
    }
  },

  Mutation: {
    async createMerma(root, { input }, { models }) {
      const { cantidad, id_tipo_merma, id_sucursal } = input;
      await models.mermas.create({
        cantidad,
        id_tipo_merma,
        id_sucursal,
        id_cortes: 1,
      });
      return true;
    },
    async createMermaTipo(root, { tipo }, { models }){
      await models.tipo_merma.create({ tipo})
      return true;
    },
    async deleteMerma(root, args, { models }) {
       await models.mermas.destroy({
        where: {
          id_merma: args.id_merma,
        },
      });
      return true;
    },
    async deleteMermaTipo(_, { id_tipo_merma }, { models }) {
      try {
          await models.tipo_merma.destroy({
              where: {
                id_tipo_merma
              }
          })
          return true
      } catch (error) {
          throw new Error(error.message)
      }
    },
  },
};

module.exports = resolvers;
