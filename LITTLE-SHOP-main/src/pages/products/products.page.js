import { LocalStorageService } from "../../services/localStorage.service.js";
import { ProductService } from "../../services/product.service.js";

export class ProductsPage extends HTMLElement {

	constructor() {
		super();
		this.products = ProductService.getProductList();
		this.productSelected = [];
		this.shadow = this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		const cantidadProductos = this.getAttribute("cantidadProductos") || 3;
		this.productSelected = LocalStorageService.getProductsInCart();
		this.#agregaEstilo(this.shadow);
		this.#render(this.shadow, cantidadProductos);
	}

	#render(shadow, cantidadProductos) {
		shadow.innerHTML += `
		<section>
			<div class="card-container">
				${this.products.slice(0, cantidadProductos).map(producto => this.#renderCard(producto)).join('')}
			</div>
		</section>
		`;
	}

	#renderCard(product) {
		return `
			<product-info id="${product.id}" name="${product.name}" description="${product.description}" price="${product.price}" image="${product.image}"></product-info>
		`
	}

	#agregaEstilo(shadow) {
		let link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "./src/pages/products/products.page.css");
		shadow.appendChild(link);
	}
}
