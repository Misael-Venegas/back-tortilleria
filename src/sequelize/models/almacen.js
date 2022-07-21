module.exports = (sequelize, DataTypes) => {
    const Almacen = sequelize.define('Almacen', {
        id_almacen: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }, cantidad: {
            type: DataTypes.INTEGER
        }, id_insumos: {
            type: DataTypes.INTEGER
        }, id_tipo_almacen: {
            type: DataTypes.INTEGER
        }, id_sucursal: {
            type: DataTypes.INTEGER
        }
    }, {});
    return Almacen
}