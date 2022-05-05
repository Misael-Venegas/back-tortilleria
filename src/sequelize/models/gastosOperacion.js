module.exports = (sequelize, DataTypes) => {
  const GastosOperacion = sequelize.define(
    "GastosOperacion",
    {
      id_operacion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_producto: {
        type: DataTypes.INTEGER,
      },
      cantidad: {
        type: DataTypes.DOUBLE(10, 2),
      },
      precio: {
        type: DataTypes.DOUBLE(10, 2),
      },
      fecha: {
        type: DataTypes.DATE,
      },
      id_usuario: {
        type: DataTypes.INTEGER,
      },
    },
    {}
  );
  return GastosOperacion;
};
