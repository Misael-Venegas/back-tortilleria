const resolvers = {
  Query: {
    async getEntradas(_, { fecha }, { models }) {
      try {
        const [results, metadata] = await models.sequelize.query(`
                SELECT e.id_entrada, e.cantidad, e.fechaRegistro , al.nombreProducto, 
                pr.nombre noProveedor , ta.nombre noTipoAlmacen FROM entradas e 
                INNER JOIN almacens al ON al.id_almacen = e.id_almacen 
                INNER JOIN proveedors pr on pr.id_proveedor = e.id_proveedor 
                INNER JOIN tipoalmacens ta ON ta.id_tipo_almacen = e.id_tipo_almacen 
                where e.fechaRegistro = '${fecha}'  
                `
        );
        return results
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = resolvers;
