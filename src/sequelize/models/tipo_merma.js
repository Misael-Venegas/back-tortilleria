module.exports = (sequelize, DataTypes) => {
    const Tipo_merma = sequelize.define('Tipo_merma', {
        id_tipo_merma: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        tipo: {
            type: DataTypes.STRING
        }
    }, {})
    return Tipo_merma
}