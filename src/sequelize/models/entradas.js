module.exports = (sequelize, DataTypes) => {
  const Entradas = sequelize.define(
    "Entradas",
    {
      id_entrada: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Fecha: {
        type: DataTypes.STRING,
      },
      id_proveedor: {
        type: DataTypes.INTEGER,
      },
    },
    {}
  );
  return Entradas;
};
