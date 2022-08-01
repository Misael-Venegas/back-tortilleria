module.exports = (sequelize, DataTypes) => {
    const Entrada = sequelize.define('Entrada', {
        id_entrada: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }, cantidad: {
            type: DataTypes.INTEGER
        }, id_tipo_almacen: {
            type: DataTypes.INTEGER
        }, id_proveedor: {
            type: DataTypes.INTEGER
        }, fechaRegistro: {
            type: DataTypes.STRING
        }, id_almacen: {
            type: DataTypes.STRING
        }
    }, {});
    return Entrada
}