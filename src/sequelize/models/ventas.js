module.exports = (sequelize, DataTypes) => {
    const Ventas = sequelize.define("Ventas",
        {
            id_ventas: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            fecha_venta: {
                type: DataTypes.STRING
            },
            hora_venta: {
                type: DataTypes.STRING
            },
            id_sucursal: {
                type: DataTypes.INTEGER
            },
            id_empleado: {
                type: DataTypes.INTEGER
            }
        }, {}
    );

    return Ventas
}