const db = require('./config/db')
const ProductoDAO = require('./dataAccess/ProductoDAO')
const VentaDAO = require('./dataAccess/VentaDAO')

async function main() {
    await db.conectar().then(() => {
        console.log('conexión exitosa')
    }).catch(err => {
        console.error(err)
    })

    await ProductoDAO.crearProducto({ nombre: 'Galletas', precio: 19.90, cantidad: 10 }).then(productoGuardado => {
        console.log('Se guardo el producto con exito: ', productoGuardado)
    }).catch(err => {
        console.error(err)
    })

    db.desconectar().then(() => {
        console.log('desconexión exitosa')
    }).catch(err => {
        console.error(err)
    })
}

main()