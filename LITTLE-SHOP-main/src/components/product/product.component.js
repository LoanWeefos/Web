import { Product } from "../../objects/product.js"
import { LocalStorageService } from "../../services/localStorage.service.js";

export class ProductComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const id = this.getAttribute('id');
        const name = this.getAttribute('name');
        const description = this.getAttribute('description');
        const price = this.getAttribute('price');
        const image = this.getAttribute('image');

        const product = new Product(id, name, description, price, image);
        this.#addStyles(this.shadow);
        this.#render(this.shadow, product);
    }

    #render(shadow, product) {
        shadow.innerHTML += `
            <div class="card">
                <img src="${product.image}" alt ="${product.name}">
                <div class="card-details">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Precio: ${product.price}</p>
                    <button class="add-to-cart-button" id="btn${product.id}">Añadir al Carrito</button>
                </div>
            </div>
        `;

        shadow.getElementById(`btn${product.id}`).addEventListener('click', () => this.#addToCartHandler(product));
    }

    #addToCartHandler(product) {
        LocalStorageService.addProductToCart(product);

        const addToCartEvent = new CustomEvent('addToCart', {
            bubbles: true,
            detail: { product }
        });

        window.dispatchEvent(addToCartEvent);
    }

    #addStyles(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./src/components/product/product.component.css");
        shadow.appendChild(link);
    }
}