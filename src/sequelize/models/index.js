// Realizar con conexión con la base de datos 
import Sequelize from "sequelize";

const sequelize = new Sequelize('tortilleria', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

const models = {
    empleados: sequelize.import('./usuarios'),
    almacen: sequelize.import('./almacen'),
    ventas: sequelize.import('./ventas'),
    productos: sequelize.import('./productos'),
    gastosoperacion: sequelize.import('./gastosoperacion'),
    mermas: sequelize.import('./mermas'),
    cargos: sequelize.import('./cargo'),
    ventas_productos: sequelize.import('./ventas_productos'),
    sucursal: sequelize.import('./sucursal'),
    cortes: sequelize.import('./cortes'),
    tipo_merma: sequelize.import('./tipo_merma'),
    proveedor: sequelize.import('./proveedor')
}

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models