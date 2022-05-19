module.exports = (sequelize, DataTypes) => {
  const EntradasAlmacen = sequelize.define(
    "EntradasAlmacen",
    {
      id_entradas_almacen: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_almacen: {
        type: DataTypes.INTEGER,
      },
      cantidad: {
        type: DataTypes.DOUBLE(10, 2),
      },
      id_insumos: {
        type: DataTypes.INTEGER,
      },
    },
    {}
  );
  return EntradasAlmacen;
};
