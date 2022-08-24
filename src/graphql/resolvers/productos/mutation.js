
const resolvers = {
    Mutation: {
        async agregarProducto(_, { nombreProducto }, { models }) {


            try {
                const existeProducto = await models.productos.findAll({
                    where: {
                        nombre: nombreProducto
                    }
                })

                if (existeProducto.length > 0) {
                    throw new Error("El nombre del producto ya existe")
                }

                await models.productos.create({
                    nombre: nombreProducto
                })
                return true
            } catch (error) {
                throw new Error(error.message)
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