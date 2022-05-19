module.exports = (sequelize, DataTypes) => {
    const Cortes = sequelize.define('Cortes', {
        id_cortes: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_sucursal: {
            type: DataTypes.INTEGER
        },
        fecha: {
            type: DataTypes.STRING
        },
        nota: {
            type: DataTypes.STRING
        }
    }, {})
    return Cortes
}