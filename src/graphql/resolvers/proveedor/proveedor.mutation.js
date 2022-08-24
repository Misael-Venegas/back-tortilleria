const resolvers = {
  Mutation: {
    async createProveedor(root, { input }, { models }) {
      const { nombre, correo, telefono } = input;
      try {
        const existeProveedor = await models.proveedor.findAll({
          where: {
            nombre
          }
        })
        if (existeProveedor.length > 0) {
          throw new Error("el nombre del proveedor ya existe")
        }
        await models.proveedor.create({ nombre, correo, telefono });
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async deleteProveedor(root, { id_proveedor }, { models }) {
      try {
        await models.proveedor.destroy({
          where: {
            id_proveedor,
          },
        });
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async updateProveedor(_, { input }, { models }) {
      try {
        const { id_proveedor, nombre, correo, telefono } = input;

        const [results, metadata] = await models.sequelize.query(` SELECT * FROM  proveedors WHERE nombre = '${nombre}' AND id_proveedor != ${id_proveedor} `)
        if (results.length > 0) {
          throw new Error("El nombre de del proveedor ya existe");
        }

        await models.proveedor.update({
          nombre,
          correo,
          telefono,
        }, {
          where: {
            id_proveedor,
          },
        });
        return true;
      } catch (error) {
        console.log(error.message)
        throw new Error(error.message);
      }
    }
  },
};

module.exports = resolvers;
