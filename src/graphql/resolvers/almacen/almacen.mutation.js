const resolvers = {
    Mutation: {
        async createAlmacenProducto(_, { producto, unidadMedida }, { models }) {
            try {

                const existeNomreProducto = await models.almacen.findAll({
                    where: {
                        nombreProducto: producto
                    }
                })

                if (existeNomreProducto.length > 0) {
                    throw new Error("El nombre del producto ya existe")
                }

                await models.almacen.create({
                    cantidadTotal: 0,
                    nombreProducto: producto,
                    unidad_de_medida: unidadMedida
                })
                return true;
            } catch (error) {
                throw new Error(error.message);
            }

        },
        async deleteAlmacenProducto(_, { id_producto }, { models }) {
            console.log(id_producto)
            try {
                await models.almacen.destroy({
                    where: {
                        id_almacen: id_producto
                    }
                })
                return true
            } catch (error) {
                throw new Error(error.message)
            }
        }, async createAlmacenTipo(_, { nombre }, { models }) {
            try {
                const existeAlmacenTipo = await models.tipoalmacen.findAll({
                    where: {
                        nombre
                    }
                })
                if (existeAlmacenTipo.length > 0) {
                    throw new Error("El nombre ya existe")
                }
                await models.tipoalmacen.create({ nombre });
                return true;
            } catch (error) {
                throw new Error(error.message)
            }
        }, async deleteAlmacenTipo(_, { id_tipo_almacen }, { models }) {
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
        async editaarTipoAlmacen(_, { idTipoAlmacen, nombre }, { models }) {
            try {
                const [results, metadata] = await models.sequelize.query(` SELECT * FROM  tipoalmacens WHERE nombre = '${nombre}' AND id_tipo_almacen != ${idTipoAlmacen} `)
                if (results.length > 0) {
                    throw new Error("El nombre ya existe");
                }

                await models.tipoalmacen.update({
                    nombre
                }, {
                    where: {
                        id_tipo_almacen: idTipoAlmacen
                    }
                })

                return true

            } catch (error) {
                throw new Error(error.message);
            }
        }
    }

};

module.exports = resolvers;
