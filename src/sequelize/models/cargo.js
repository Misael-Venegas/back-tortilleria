module.exports = (sequelize, DataTypes) => {
    const Cargo = sequelize.define('Cargo', {
        id_cargo: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_cargo: {
            type: DataTypes.STRING
        }

    }, {})
    return Cargo;
}