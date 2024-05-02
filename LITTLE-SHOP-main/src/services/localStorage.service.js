export class LocalStorageService{
    static addProductToCart(product){
        let products = this.getProductsInCart();
        products.push(product);
        const productosString = JSON.stringify(products);
        localStorage.setItem('ProductsInCart', productosString);
    }

    static getProductsInCart(){
        const productosString = localStorage.getItem('ProductsInCart');
        return productosString ? JSON.parse(productosString) :[];
    }
}