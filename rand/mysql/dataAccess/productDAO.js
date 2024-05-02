const db = require('../config/db')

class ProductDAO{
    constructor(){}

    insertProduct(product, callback){
        const insertQuery = `INSERT INTO products(name, price, description) VALUES ('${product.name}', ${product.price}, '${product.description}')`;
    
        db.query(insertQuery, (err,result)=>{
            if(err){
                callback(err);
            }else{
                callback(null, result);
            }
        })
    }

    selectProducts(callback){
        const selectQuery = `SELECT * FROM products`

        db.query(selectQuery, (err, result, fields)=>{
            if(err){
                callback(err)
            }else{
                callback(null, result, fields)
            }
        })
    }

    selectProductById(id, callback){
        const selectQuery = `SELECT * FROM products WHERE id=${id}`

        db.query(selectQuery, (err, result, fields)=>{
            if(err){
                callback(err)
            }else{
                callback(null, result, fields)
            }
        })
    }

    updateProductsById(id, product, callback){
        const updateQuery = `UPDATE products SET name='${product.name}', price=${product.price}, description='${product.description}' WHERE id=${id}`
        
        db.query(updateQuery, (err,result)=>{
            if(err){
                callback(err);
            }else{
                callback(null, result);
            }
        })
    }

    deleteProductsById(id, product, callback){
        const deleteQuery = `DELETE FROM products WHERE id=${id}`
        
        db.query(deleteQuery, (err,result)=>{
            if(err){
                callback(err);
            }else{
                callback(null, result);
            }
        })
    }
}

module.exports = new ProductDAO();