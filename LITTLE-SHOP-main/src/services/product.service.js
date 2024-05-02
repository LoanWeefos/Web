import { Product } from "../objects/product.js"

export class ProductService{
    static getProductList(){
        const productList = [
            new Product(1, 'Coca-cola', "Refresco sabor cola", "$19.99", './src/assets/images/cocacola.png'),
            new Product(2, 'Sabritas', "Papitas", "$29.99", './src/assets/images/sabritas.jpg'),
            new Product(3, 'Galletas', "Mini pack de galletas", "$19.99", './src/assets/images/galletas.png')
        ];
        return productList;
    }   
}