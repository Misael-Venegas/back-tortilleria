
const resolvers = {
    Mutation: {
        async agregarProducto(root, { input }, { models }) {
            const { nombre, precioVenta, unidad, id_producto_almacen } = input
            console.log(nombre, precioVenta, unidad, id_producto_almacen)
            try {
                await models.productos.create({ nombre, precioVenta, unidad, id_producto_almacen })
                return true
            } catch (error) {
                console.log(error.message)
                throw new Error("Error al intenatr agregar un nuevo producto " + error.message)
            }
        },
        async eliminarProducto(_, { id_producto }, { models }) {
            try {
                await models.productos.destroy({
                    where: {
                        id_producto
                    }
                })
                return true;
            } catch (error) {
                throw new Error("No se puedo completar la operación: " + error.message);
            }
        },
        async editarProducto(_, { input }, { models }) {
            const { id_producto, nombre, precioVenta, unidad, id_producto_almacen } = input;
            try {
                await models.productos.update({
                    nombre,
                    precioVenta,
                    unidad,
                    id_producto_almacen
                }, {
                    where: {
                        id_producto
                    }
                })
            } catch (error) {
                throw new Error("Error a editar el producto")
            }
        }
    }
}
module.exports = resolvers