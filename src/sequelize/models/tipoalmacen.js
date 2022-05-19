module.exports = (sequelize, DataTypes) => {
  const TipoAlmacen = sequelize.define(
    "TipoAlmacen",
    {
      id_tipo_almacen: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
      },
    },
    {}
  );
  return TipoAlmacen;
};
