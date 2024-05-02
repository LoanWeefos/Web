const Venta = require('../models/Venta')

class VentaDAO {
    constructor() { }

    async crearVenta(ventaData) {
        try {
            const venta = new Venta(ventaData)
            return await venta.save();
        } catch (error) {
            throw error
        }
    }

    async obtenerVentaPorId(id) {
        try {
            return await Venta.findById(id);
        } catch (error) {
            throw error
        }
    }

    async agregarProductosAVenta(idVenta, productos) {
        try {
            const venta = await Venta.findById(idVenta)
            if (!venta) {
                throw new Error('No se encontro la venta')
            }

            venta.productosventa.push(...productos.map(producto => ({
                idProducto: producto.idProducto,
                descripcion: producto.nombre,
                precioVenta: producto.precioVenta,
                cantidad: producto.cantidadVendida,
                subtotal: producto.precioVenta * producto.cantidadVendida
            })))

            return await venta.save()
        } catch (error) {
            throw error
        }
    }
}

module.exports = new VentaDAO()