module.exports = (sequelize, DataTypes) => {
    const Proveedor = sequelize.define('Proveedor', {
        id_proveedor: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING
        },
        correo: {
            type: DataTypes.STRING,
        },
        telefono: {
            type: DataTypes.STRING
        }
    }, {})

    return Proveedor
}