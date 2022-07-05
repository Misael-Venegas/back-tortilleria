module.exports = (sequelize, DataTypes) => {
    const Empleado = sequelize.define('Empleado', {
        id_empleado: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellidoP: {
            type: DataTypes.STRING,
        },
        apellidoM: {
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
        id_cargo: {
            type: DataTypes.INTEGER,
        }, direccion: {
            type: DataTypes.STRING,
        }
    }, {});
    return Empleado
}