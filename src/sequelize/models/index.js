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
    gastosoperacion: sequelize.import('./gastosoperacion'),
    mermas: sequelize.import('./mermas'),
    entradas: sequelize.import('./entradas'),
    entradasalmacen: sequelize.import('./entradasalmacen'),
    insumos: sequelize.import('./insumos'),
    salidas: sequelize.import('./salidas'),
    salidasalmacen: sequelize.import('./salidasalmacen'),
    tipoalmacen: sequelize.import('./tipoalmacen')
}

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models