module.exports = (sequelize, DataTypes) => {
    const Ventas = sequelize.define("Ventas",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            id_usuario: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            total: {
                type: DataTypes.DOUBLE
            },
            fecha_venta: {
                type: DataTypes.STRING
            },
            hora_venta: {
                type: DataTypes.STRING
            },
            id_producto: {
                type: DataTypes.INTEGER
            },
            cantidad: {
                type: DataTypes.DOUBLE
            }
        }, {}
    );

    return Ventas
}