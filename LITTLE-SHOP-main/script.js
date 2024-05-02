import { HeaderComponent } from "./src/components/header/header.component.js"
import { CartPage } from "./src/pages/cart/cart.page.js";
import { FooterComponent } from "./src/components/footer/footer.component.js";
import { ProductsPage } from "./src/pages/products/products.page.js";
import { ProductComponent } from "./src/components/product/product.component.js";

document.addEventListener('DOMContentLoaded', function(){
    //configuración de rutas
    page('/', ()=> showContent('products-page'));
    page('/cart', ()=> showContent('cart-page'));

    //inicializar el routeo
    page();
})

function showContent(contentId){
    const contentContainer =  document.getElementById('content');
    contentContainer.innerHTML = `<${contentId} cantidadProductos="${3}"></${contentId}>`
}

//Components
window.customElements.define('header-info', HeaderComponent);
window.customElements.define('footer-info', FooterComponent);
window.customElements.define('product-info', ProductComponent);
//Pages
window.customElements.define('products-page', ProductsPage);
window.customElements.define('cart-page', CartPage);

