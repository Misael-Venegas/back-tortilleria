const resolvers = {
    Mutation: {
        async agregarVenta(_, { input, id_epleado }, { models, usuario }) {
            const { productos } = input;
            console.log(productos)

            try {
                productos.forEach(async (element) => {
                    const fecha = new Date()
                    const venta = await models.ventas.create({
                        fecha_venta: fecha.getFullYear() + "-" + ("0" + (fecha.getMonth() + 1)).slice(-2) + "-" + ("0" + fecha.getDate()).slice(-2),
                        id_sucursal: element.id_sucursal,
                        id_empleado: id_epleado === "" ? usuario.id_empleado : parseInt(id_epleado),
                        hora_venta: fecha.getHours() + ":" + fecha.getMinutes()
                    })

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