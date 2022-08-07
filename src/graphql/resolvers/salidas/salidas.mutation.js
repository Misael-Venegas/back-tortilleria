
const resolvers = {
    Mutation: {
        async createSalida(_, { input }, { models }) {

            try {

                const obtenerAlmacen = await models.almacen.findByPk(input.id_almacen)

                const restarCantidades = parseInt(obtenerAlmacen.cantidadTotal - input.cantidad);
                // console.log(restarCantidades)
                await models.almacen.update({
                    cantidadTotal: restarCantidades
                }, {
                    where: {
                        id_almacen: obtenerAlmacen.id_almacen
                    }
                })


                await models.salidas.create(input)
                return true
            } catch (error) {
                throw new Error(error.message)
            }
        }
    }
}

module.exports = resolvers