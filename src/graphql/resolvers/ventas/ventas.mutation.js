const resolvers = {
    Mutation: {
        async agregarVenta(_, { input }, { models, usuario }) {
            const { productos } = input;
            console.log(productos)

            try {
                productos.forEach(async (element) => {
                    const fecha = new Date()
                    const venta = await models.ventas.create({
                        fecha_venta: fecha.getFullYear() + "-" + ("0" + (fecha.getMonth() + 1)).slice(-2) + "-" + ("0" + fecha.getDate()).slice(-2),
                        id_sucursal: element.id_sucursal,
                        id_empleado: usuario.id_empleado
                    })

                    console.log(venta)
                    await models.ventas_productos.create({
                        id_ventas: venta.id_ventas,
                        id_producto: element.id_producto,
                        total: element.precio,
                        cantidad: element.cantidad
                    })
                });
                return true
            } catch (error) {
                throw new Error("Error. al intentar guardar las ventas: " + error.message)
            }
        }
    }
}

module.exports = resolvers