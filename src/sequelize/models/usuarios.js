module.exports = (sequelize, DataTypes) => {
        const Usuarios = sequelize.define('Usuarios', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false
            },
            apellidos: {
                type: DataTypes.STRING,
            },
            telefono: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            tipo: {
                type: DataTypes.INTEGER,
            }
        }, {});
        return Usuarios
}