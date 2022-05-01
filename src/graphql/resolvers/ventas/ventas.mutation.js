const resolvers = {
    Mutation: {
        async agregarVenta(_, { input }, { models }) {
            const { productos } = input;
            try {
                productos.forEach( async (element) => {
                    await models.ventas.create({
                        id_usuario: element.id_usuario,
                        total: element.total,
                        fecha_venta: element.fecha_venta,
                        hora_venta: element.hora_venta,
                        id_producto: element.id_producto,
                        cantidad: element.cantidad
                    })
                });
                return true
            } catch (error) {
                throw new Error("Error. al intentar guardar las ventas: "+ error.message)
            }

        }
    }
}

module.exports = resolvers