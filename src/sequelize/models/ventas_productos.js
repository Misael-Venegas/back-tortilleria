module.exports = (sequelize, DataTypes) => {
    const Venta_productos = sequelize.define('Venta_productos', {
        id_ventas_productos: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_ventas: {
            type: DataTypes.INTEGER
        },
        id_producto: {
            type: DataTypes.INTEGER
        },
        total: {
            type: DataTypes.FLOAT
        }, cantidad: {
            type: DataTypes.INTEGER
        }
    }, {});
    return Venta_productos
}