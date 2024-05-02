const db = require('../config/db')

class ProductPromiseDAO {
    constructor() { };

    executeQuery(query) {
        return new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    async insertProduct(product) {
        const insertQuery = `INSERT INTO products(name, price, description) VALUES ('${product.name}', ${product.price}, '${product.description}')`;

        try {
            const result = await this.executeQuery(insertQuery);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async selectProducts() {
        const selectQuery = `SELECT * FROM products`

        try {
            const result = await this.executeQuery(selectQuery);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async selectProductById(id) {
        const selectQuery = `SELECT * FROM products WHERE id=${id}`

        try {
            const result = await this.executeQuery(selectQuery);
            if (result != "") {
                return result;
            } else {
                throw new Error("Id no encontrado")
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteProductsById(id) {
        const deleteQuery = `DELETE FROM products WHERE id=${id}`

        try {
            const result = await this.executeQuery(deleteQuery);
            if (result.affectedRows > 0) {
                return result;
            } else {
                throw new Error("Id no encontrado")
            }
        } catch (error) {
            throw error;
        }
    }

    async updateProductsById(id, product) {
        const updateQuery = `UPDATE products SET name='${product.name}', price=${product.price}, description='${product.description}' WHERE id=${id}`

        try {
            const result = await this.executeQuery(updateQuery);
            if (result.affectedRows > 0) {
                return result;
            } else {
                throw new Error("Id no encontrado")
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProductPromiseDAO();