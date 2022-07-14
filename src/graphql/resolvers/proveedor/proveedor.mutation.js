const resolvers = {
  Mutation: {
    async createProveedor(root, { input }, { models }) {
      const { nombre, correo, telefono } = input;
      try {
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
    async updateProveedor(_,{input},{models}){
      try {
        const {id_proveedor,nombre, correo, telefono }=input;
        await models.proveedor.update({
            nombre,
            correo,
            telefono,
          },{
          where: {
            id_proveedor,
          },
        });
        return true;
      } catch (error) {
        throw new Error("Error al intentar actualizar los datos del proveedor");
      }
    }
  },
};

module.exports = resolvers;
