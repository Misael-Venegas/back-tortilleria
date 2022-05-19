module.exports = (sequelize, DataTypes) => {
    const Productos = sequelize.define("Productos",
        {
            id_producto: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
        , {});

    return Productos
}