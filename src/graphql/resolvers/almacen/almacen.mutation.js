const resolvers = {
    Mutation: {
        async createAlmacenProducto(_, { producto, unidadMedida }, { models }) {
            try {
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
            await models.tipoalmacen.create({ nombre });
            return true;
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
