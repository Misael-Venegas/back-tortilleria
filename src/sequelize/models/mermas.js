module.exports = (sequelize, DataTypes) => {
  const Mermas = sequelize.define(
    "Mermas",
    {
      id_merma: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tipo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.DOUBLE(10, 2),
      },
      descripcion: {
        type: DataTypes.STRING,
      },
      id_usuario: {
        type: DataTypes.INTEGER,
      },
      fecha: {
        type: DataTypes.DATE,
      },
    },
    {}
  );

  return Mermas;
};
