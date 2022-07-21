const resolvers = {
  Mutation: {
    async createEntradas(root, { input, inputAlmacen }, { models }) {
      const { id_almacen, id_insumos, cantidad} = inputAlmacen;
      const { fecha, id_proveedor } = input;
      try {
        const [results, metadata] = await models.sequelize.query(`SELECT cantidad from almacens where id_almacen=${id_almacen}`);
        await models.almacen.update({
          cantidad: (results[0].cantidad+cantidad)
        },{where:{id_almacen}});
        await models.entradas.create({ Fecha: fecha, id_proveedor });
        await models.entradasalmacen.create({
          id_almacen,
          cantidad,
          id_insumos,
        });
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async upateEntradas(root, { input, inputAlmacen }, { models }) {
      try {
        const { fecha, id_proveedor } = input;
        const { id_entradas_almacen,id_almacen, id_insumos, cantidad} = inputAlmacen;    
        await models.entradas.update({ Fecha: fecha, id_proveedor },{where :{id_entrada:id_entradas_almacen}});
        await models.entradasalmacen.update({
          id_almacen,
          cantidad,
          id_insumos,
        },{where: {id_entradas_almacen}});
        return true;
      } catch (error) {
        //console.log(error.message)
        throw new Error(error.message);
      }
    },
  },
};

module.exports = resolvers;
