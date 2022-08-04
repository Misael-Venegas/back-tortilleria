const resolvers = {
    Query: {
        async getAllSalidas(_, { fecha }, { models }) {
            try {
                const [results, metadata] = await models.sequelize.query(`SELECT s.cantidad, s.Fecha, 
                            al.nombreProducto, al.unidad_de_medida, 
                            su.nombre noSucursal FROM salidas s 
                            INNER JOIN almacens al on s.id_almacen=al.id_almacen 
                            INNER JOIN sucursals su on su.id_sucursal = s.id_sucursal
                            where s.Fecha = '${fecha}'  
                `
                );
                return results
            } catch (error) {
                throw new Error(error.message)
            }
        }
    }
}

module.exports = resolvers