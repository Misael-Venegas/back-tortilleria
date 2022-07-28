module.exports = (sequelize, DataTypes) => {
  const Insumos = sequelize.define(
    "Insumos",
    {
      id_insumo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
      unidad_medida: {
        type: DataTypes.STRING,
      },
      id_tipo_almacen: {
        type: DataTypes.INTEGER,
      },
    },
    {}
  );
  return Insumos;
};
