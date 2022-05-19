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
      descripcion: {
        type: DataTypes.STRING,
      },
    },
    {}
  );
  return Salidas;
};
