
const resolvers = {
    Query: {
        async generarReporte(_, { desde, hasta }, { models }) {

            const nombres = [];
            const ventas = [];
            const ventasRealizadas = [];
            const [results, metadata] = await models.sequelize.query(`
                SELECT CONCAT(e.nombre, ' ', e.apellidoP) nombre, SUM(vp.total) ventas, COUNT(e.id_empleado) ventasRealizadas
                FROM empleados e INNER JOIN ventas v ON v.id_empleado = e.id_empleado 
                INNER JOIN venta_productos vp on vp.id_ventas = v.id_ventas 
                WHERE v.fecha_venta >= '${desde}' AND v.fecha_venta <= '${hasta}'
                GROUP by e.id_empleado; 
            `);

            console.log(results)

            for (let index = 0; index < results.length; index++) {
                nombres.push(results[index].nombre.toString());
                ventas.push(results[index].ventas);
                ventasRealizadas.push(results[index].ventasRealizadas)
                console.log(results[index].nombre)
            }


            return {
                nombres,
                ventas,
                ventasRealizadas
            }
        },

    }
}

module.exports = resolvers