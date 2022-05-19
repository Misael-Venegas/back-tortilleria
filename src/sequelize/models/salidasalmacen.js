module.exports = (sequelize, DataTypes) => {
  const SalidasAlmacen = sequelize.define(
    "SalidasAlmacen",
    {
      id_salidas_almacen: {
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
      id_salida: {
        type: DataTypes.INTEGER,
      },
    },
    {}
  );
  return SalidasAlmacen;
};
