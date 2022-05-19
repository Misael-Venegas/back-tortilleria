module.exports = (sequelize, DataTypes) => {
    const Sucursal = sequelize.define('Sucursal', {
        id_sucursal: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING
        },
        telefono: {
            type: DataTypes.STRING
        },
        direccion: {
            type: DataTypes.STRING
        }
    }, {})
    return Sucursal
}