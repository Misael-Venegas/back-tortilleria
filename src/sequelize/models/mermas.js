module.exports = (sequelize, DataTypes) => {
  const Mermas = sequelize.define(
    "Mermas",
    {
      id_merma: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cantidad: {
        type: DataTypes.FLOAT
      },
      id_cortes: {
        type: DataTypes.INTEGER
      },
      id_tipo_merma: {
        type: DataTypes.INTEGER
      },
      id_sucursal: {
        type: DataTypes.INTEGER
      }

    },
    {}
  );

  return Mermas;
};
