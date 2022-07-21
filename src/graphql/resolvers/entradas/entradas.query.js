const resolvers = {
  Query: {
    async getEntradas(root, args, { models }) {
      try {
        const [results, metadata] = await models.sequelize.query(`
                SELECT 
                  ea.id_entradas_almacen, 
                  ea.cantidad, 
                  e.id_entrada,
                  e.Fecha fecha,
                  i.descripcion, 
                  i.id_insumos,
                  p.nombre,
                  p.id_proveedor,
                  ta.nombre tipo_almacen,
                  a.id_almacen
                  from entradasalmacens ea
                  INNER JOIN entradas e ON ea.id_entradas_almacen=e.id_entrada
                  INNER JOIN almacens a ON ea.id_almacen=a.id_almacen
                  INNER JOIN insumos i ON a.id_insumos=i.id_insumos
                  INNER JOIN tipoalmacens ta ON i.id_tipo_almacen=ta.id_tipo_almacen
                  INNER JOIN proveedors p ON e.id_proveedor=p.id_proveedor
                `);
        return results;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = resolvers;
