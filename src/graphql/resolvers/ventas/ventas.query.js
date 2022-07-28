const resolvers = {
  Query: {
    async generarCorteDeCaja(_, { fechaCorte, id_sucursal }, { models }) {
      try {
        if (id_sucursal === "") {
          const [results, metadata] = await models.sequelize.query(`SELECT vp.id_ventas_productos, 
                vp.cantidad, vp.total, pr.nombre nombre_producto,
                su.nombre nombre_sucursal, CONCAT(ep.nombre, ' ' ,ep.apellidoP, ' ', ep.apellidoM) 
                empleado FROM venta_productos vp 
                INNER JOIN ventas ve ON ve.id_ventas = vp.id_ventas 
                INNER JOIN productos pr ON pr.id_producto = vp.id_producto 
                INNER JOIN sucursals su ON su.id_sucursal = ve.id_sucursal 
                INNER JOIN empleados ep ON ve.id_empleado = ep.id_empleado
                WHERE ve.fecha_venta = '${fechaCorte}'`)
          return results
        }
        const [results, metadata] = await models.sequelize.query(`SELECT vp.id_ventas_productos, 
                vp.cantidad, vp.total, pr.nombre nombre_producto,
                su.nombre nombre_sucursal, CONCAT(ep.nombre, ' ' ,ep.apellidoP, ' ', ep.apellidoM) 
                empleado FROM venta_productos vp 
                INNER JOIN ventas ve ON ve.id_ventas = vp.id_ventas 
                INNER JOIN productos pr ON pr.id_producto = vp.id_producto 
                INNER JOIN sucursals su ON su.id_sucursal = ve.id_sucursal 
                INNER JOIN empleados ep ON ve.id_empleado = ep.id_empleado
                WHERE ve.fecha_venta = '${fechaCorte}' AND su.id_sucursal=${parseInt(id_sucursal)} `)
        return results
      } catch (error) {
        throw new Error("Error al intentar obtener el corte de caja")
      }
    }
  },
};

module.exports = resolvers;
