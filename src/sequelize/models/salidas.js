module.exports = (sequelize, DataTypes) => {
  const Salidas = sequelize.define(
    "Salidas",
    {
      id_salida: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Fecha: {
        type: DataTypes.STRING,
      },
      id_almacen: {
        type: DataTypes.INTEGER,
      },
      cantidad: {
        type: DataTypes.INTEGER,
      }, id_sucursal: {
        type: DataTypes.INTEGER,
      },
    },
    {}
  );
  return Salidas;
};
