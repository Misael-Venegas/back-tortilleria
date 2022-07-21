const resolvers = {
  Query: {
    async getAlmacen(root, args, { models }) {
      const [results, metadata] = await models.sequelize.query(`
        SELECT a.id_almacen, a.id_sucursal, a.cantidad, a.id_insumos, a.id_tipo_almacen, ta.nombre as tipo_almacen, ta.nombre nombreTipoAlmacen, s.nombre nombreSucursal, i.descripcion nombreInsumo from almacens a
        INNER JOIN tipoalmacens ta on ta.id_tipo_almacen=a.id_tipo_almacen
        INNER JOIN insumos i on i.id_insumos=a.id_insumos
        INNER JOIN sucursals s ON s.id_sucursal=a.id_sucursal`);
      return results;
      //return await models.almacen.findAll();
    },
    async getAlmacenTipo(root, args, { models }) {
      return await models.tipoalmacen.findAll();
    },
    async getAlmacenProducto(root, args, { models }) {
      return await models.almacen.findByPk(args.id);
    },
  },

  Mutation: {
    async createAlmacenProducto(root, { input }, { models }) {
      try {
        const { cantidad, id_insumos, id_tipo_almacen, id_sucursal } = input;
        await models.almacen.create({
          cantidad,
          id_insumos,
          id_tipo_almacen,
          id_sucursal,
        });
        return true;
      } catch (error) {
        //console.log(error.message)
        throw new Error(error.message);
      }
    },
    async createAlmacenTipo(root, { nombre }, { models }) {
      await models.tipoalmacen.create({ nombre });
      return true;
    },
    async deleteAlmacenTipo(_, { id_tipo_almacen }, { models }) {
      try {
        await models.tipoalmacen.destroy({
          where: {
            id_tipo_almacen,
          },
        });
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async deleteAlmacenProducto(root, args, { models }) {
      try {
        await models.almacen.destroy({
          where: {
            id_almacen: args.id_almacen,
          },
        });
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async updateAlmacenProducto(root, { input }, { models }) {
      const { id_almacen, cantidad, id_insumos, id_tipo_almacen, id_sucursal } =
        input;
      try {
        await models.almacen.update(
          {
            cantidad,
            id_insumos,
            id_tipo_almacen,
            id_sucursal,
          },
          { where: { id_almacen } }
        );
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async updateAlmacenStock(root, { input }, { models }) {
      const { id_almacen, cantidad } = input;
      console.log("lllllllllllllllll")
      try {
        console.log(input);
        /*  const [results, metadata] = await models.sequelize.query(`SELECT cantidad from almacens where id_almacen=${id_almacen}`);
        console.log(results);*/
        /*  await models.almacen.update(
          {
            cantidad,
          },
          { where: { id_almacen } }
        );*/
        return true;
      } catch (error) { 
        console.log(error.message)
        throw new Error(error.message);
      }
    },
  },
};

module.exports = resolvers;
