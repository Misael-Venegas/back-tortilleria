module.exports = (sequelize, DataTypes) => {
    const Almacen = sequelize.define('Almacen', {
        id_almacen: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }, cantidadTotal: {
            type: DataTypes.INTEGER
        }, nombreProducto: {
            type: DataTypes.STRING
        }, unidad_de_medida: {
            type: DataTypes.STRING
        }
    }, {});
    return Almacen
}