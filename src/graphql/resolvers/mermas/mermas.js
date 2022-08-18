const resolvers = {
  Query: {
    async getMermas(root, { fecha, id_sucursal }, { models }) {

      if (id_sucursal !== "") {
        const [results, metadata] = await models.sequelize.query(`
        SELECT m.id_merma, m.cantidad, m.id_tipo_merma, m.id_sucursal, m.fecha_registro, tm.tipo tipo_merma, s.nombre sucursal from mermas m
        INNER JOIN tipo_mermas tm on tm.id_tipo_merma=m.id_tipo_merma
        INNER JOIN sucursals s ON s.id_sucursal=m.id_sucursal WHERE m.fecha_registro = '${fecha}' AND m.id_sucursal = ${parseInt(id_sucursal)}  `);
        return results;

      }

      const [results, metadata] = await models.sequelize.query(`
        SELECT m.id_merma, m.cantidad, m.id_tipo_merma, m.id_sucursal, m.fecha_registro, tm.tipo tipo_merma, s.nombre sucursal from mermas m
        INNER JOIN tipo_mermas tm on tm.id_tipo_merma=m.id_tipo_merma
        INNER JOIN sucursals s ON s.id_sucursal=m.id_sucursal WHERE m.fecha_registro = '${fecha}'`);
      return results;
      //return await models.mermas.findAll();
    },
    async getMerma(root, args, { models }) {
      return await models.mermas.findByPk(args.id);
    },
    async getTipoMermas(root, args, { models }) {
      return await models.tipo_merma.findAll();
    }
  },

  Mutation: {
    async createMerma(root, { input }, { models }) {
      const fecha = new Date();
      const fechaActual = fecha.getFullYear() + "-" + ("0" + (fecha.getMonth() + 1)).slice(-2) + "-" + ("0" + fecha.getDate()).slice(-2)
      const { cantidad, id_tipo_merma, id_sucursal } = input;
      try {
        const buscarRegistro = await models.mermas.findAll({
          where: {
            id_tipo_merma,
            fecha_registro: fechaActual,
            id_sucursal
          }
        })
        console.log(buscarRegistro)
        if (buscarRegistro.length > 0) {
          const suma = parseFloat(cantidad + buscarRegistro[0].cantidad)

          await models.mermas.update({
            cantidad: suma
          }, {
            where: {
              id_tipo_merma
            }
          }
          )
          return true
        }
        await models.mermas.create({
          cantidad,
          id_tipo_merma,
          id_sucursal,
          fecha_registro: fechaActual,
        });
        return true;

      } catch (error) {
        throw new Error(error.message)
      }


    },
    async createMermaTipo(root, { tipo }, { models }) {
      await models.tipo_merma.create({ tipo })
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
