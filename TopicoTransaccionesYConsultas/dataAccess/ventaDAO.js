const db = require("../config/db");

class VentaDAO {
    constructor() { }

    async insertarVentaConProductos(venta, productos) {
        const insertVentaQuery = 'INSERT INTO Venta (total, IVA) VALUES (?, ?)';
        const insertProductoVentaQuery = 'INSERT INTO ProductoVenta (idVenta, idProducto, cantidadVendida, subtotal, precioVenta) VALUES (?, ?, ?, ?, ?)';

        return await new Promise((resolve, reject) => {
            db.beginTransaction(async (err) => {
                if (err) { reject(err); }

                try {
                    const insertVentaResult = await this.ejecutarQuery(insertVentaQuery, [venta.total, venta.iva]);
                    const ventaId = insertVentaResult.insertId;

                    for (const producto of productos) {
                        const subtotal = producto.precioVenta * producto.cantidadVendida;
                        const insertProductoVentaResult = await this.ejecutarQuery(insertProductoVentaQuery, [ventaId, producto.idProducto, producto.cantidadVendida, subtotal, producto.precioVenta]);
                    }

                    db.commit((err) => {
                        if (err) {
                            db.rollback(() => {
                                reject(err);
                            });
                        } else {
                            resolve("Venta realizada correctamente.");
                        }
                    });
                } catch (error) {
                    db.rollback(() => {
                        reject(error);
                    });
                }
            });
        });
    }

    async seleccionarVentas() {
        const selectQuery = 'SELECT * FROM Venta';

        return await this.ejecutarQuery(selectQuery);
    }

    async seleccionarVentaPorID(id) {
        const selectQuery = 'SELECT * FROM Venta WHERE id = ?';

        return await this.ejecutarQuery(selectQuery, [id]);
    }

    async editarVenta(id, venta) {
        const updateQuery = 'UPDATE Venta SET total=?, IVA=? WHERE id=?';
        const values = [venta.total, venta.iva, id];

        return await this.ejecutarQuery(updateQuery, values);
    }

    async eliminarVenta(id) {
        const deleteQuery = 'DELETE FROM Venta WHERE id = ?';

        return await this.ejecutarQuery(deleteQuery, [id]);
    }

    async ejecutarQuery(query, values) {
        return await new Promise((resolve, reject) => {
            db.query(query, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = new VentaDAO();
