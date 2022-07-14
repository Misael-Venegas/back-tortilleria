const resolvers = {
    Query: {
        async getInsumos(root, args, { models }) {
            //return await models.insumos.findAll();
            const [results, metadata] =  await models.sequelize.query("SELECT i.id_insumos, i.descripcion, i.unidad_medida, i.id_tipo_almacen, ta.nombre as tipo_almacen from insumos i INNER JOIN tipoalmacens ta on i.id_tipo_almacen=ta.id_tipo_almacen");
            return results     
       },
    }
}
module.exports = resolvers