// Realizar con conexión con la base de datos 
import Sequelize from "sequelize";

const sequelize = new Sequelize('tortilleria', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

const models = {
    usuarios: sequelize.import('./usuarios'),
    almacen: sequelize.import('./almacen'),
    ventas: sequelize.import('./ventas'),
    productos: sequelize.import('./productos'),
    productos: sequelize.import('./gastosOperacion'),
    productos: sequelize.import('./mermas')
}

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models