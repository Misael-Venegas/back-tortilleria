module.exports = (sequelize, DataTypes) => {
    const Almacen = sequelize.define('Almacen', {
        id_Producto_Almacen: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
        },
        categoria: {
            type: DataTypes.STRING,
        },
        unidad_Medida: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.INTEGER,
        },
        stock: {
            type: DataTypes.DOUBLE(10,2),
        }
    }, {});
    return Almacen
}