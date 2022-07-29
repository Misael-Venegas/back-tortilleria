
const resolvers = {
    Query: {
        async generarReporte(_, {desde, hasta}, { models }) {

            const nombres = [];
            const ventas = [];

            const [results, metadata] = await models.sequelize.query(`
                SELECT CONCAT(e.nombre, ' ', e.apellidoP) nombre, COUNT(e.id_empleado) ventas
                FROM empleados e
                INNER JOIN ventas v ON v.id_empleado = e.id_empleado
                WHERE v.fecha_venta >= '${desde}' AND v.fecha_venta <= '${hasta}'
                GROUP by e.id_empleado
            `);

            console.log(results)

            for (let index = 0; index < results.length; index++) {
                nombres.push(results[index].nombre.toString());
                ventas.push(results[index].ventas);
                console.log(results[index].nombre)
            }


            return {
                nombres,
                ventas
            }
        },
        
    }
}

module.exports = resolvers