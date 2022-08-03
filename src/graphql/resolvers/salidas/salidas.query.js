const resolvers = {
    Query: {
      async getSalidas(_, {fecha}, { models }) {
        try {
          const [results, metadata] = await models.sequelize.query(`
            SELECT s.id_salida, s.Fecha, s.descripcion,
            sa.id_salidas_almacen, sa.id_almacen, sa.cantidad, a.nombreProducto nombre
            FROM salidas s 
            INNER JOIN salidasalmacens sa ON s.id_salida = sa.id_salidas_almacen
            INNER JOIN almacens a ON sa.id_almacen= a.id_almacen
            where s.Fecha = '${fecha}'     `
          );
          return results
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },
  };
  
  module.exports = resolvers;
  