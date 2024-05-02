async function main() {
    try {
        await db.connect();

        console.log('Conexión exitosa a la base de datos');

        const newProduct = new Producto(null, 'Coca cola', 20, 10);
        const productInsertResult = await productoDAO.insertarProducto(newProduct);
        console.log('Producto insertado:', productInsertResult);

        const newVenta = new Venta(null, 100, 15);
        const ventaInsertResult = await ventaDAO.insertarVenta(newVenta);
        console.log('Venta insertada:', ventaInsertResult);
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        db.end((err) => {
            if (err) {
                console.error('Error al desconectarse de la base de datos', err);
            } else {
                console.log('Conexión terminada');
            }
        });
    }
}
