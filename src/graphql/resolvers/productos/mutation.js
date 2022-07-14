
const resolvers = {
    Mutation: {
        async agregarProducto(_, { nombreProducto }, { models }) {
            try {
                await models.productos.create({
                    nombre: nombreProducto
                })
                return true
            } catch (error) {
                throw new Error("Error al intenatar agregar un nuevo producto " + error.message)
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
 
    }
}
module.exports = resolvers