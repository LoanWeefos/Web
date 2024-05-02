const db = require('./config/db')
const Product = require('./models/products')
const ProductDAO = require('./dataAccess/productDAO');
const productPromiseDAO = require('./dataAccess/productPromiseDAO');

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos');
        return;
    }
    console.log('Conexión exitosa a la base de datos');

    const newProduct = new Product(null, 'Galletas', 10, 'Emperador')
    
    /* ProductDAO.insertProduct(newProduct, (err, result) => {
        if (err) {
            console.error('Error al insertar producto', err)
        } else {
            console.log('Producto insertado con exito', result)
        }
    }) */

    /* ProductDAO.selectProducts((err, result, fields) => {
        if(err){
            console.error('Error al seleccionar la lista de productos')
        }else{
            console.log('productos seleccionados result: ', result)
            console.log('productos seleccionados fields: ', fields)
        }
    }) */


    //----------------------------------------------------------------------------------------------------
    /* productPromiseDAO.insertProduct(newProduct)
        .then(result => {
            console.log('Producto insertado con éxito', result);
        })
        .catch(error => {
            console.error('Error al insertar producto', error);
        }); */

    /* productPromiseDAO.selectProducts()
        .then(result => {
            console.log('Producto seleccionados con éxito', result);
        })
        .catch(error => {
            console.error('Error al seleccionar productos', error);
        }); */

    /* productPromiseDAO.selectProductById(2)
        .then(result => {
            console.log('Producto seleccionado con éxito', result);
        })
        .catch(error => {
            console.error('Error al seleccionar producto', error);
        }); */

    /* productPromiseDAO.deleteProductsById(1)
        .then(result => {
            console.log('Producto eliminado con éxito', result);
        })
        .catch(error => {
            console.error('Error al eliminar producto', error);
        }); */

    /* productPromiseDAO.updateProductsById(1, newProduct)
        .then(result => {
            console.log('Producto actualizado con éxito', result);
        })
        .catch(error => {
            console.error('Error al actualizar producto', error);
        }); */

    db.end((err) => {
        if (err) {
            console.error('Error al desconectarse de la base de datos', err)
        } else {
            console.log('Desconexión exitosa de la base de datos')
        }
    })
})