import { LocalStorageService } from "../../services/localStorage.service.js";

export class CartPage extends HTMLElement {

	constructor() {
		super();
	}

	connectedCallback() {
		const shadow = this.attachShadow({ mode: "open" });
		this.#agregaEstilo(shadow);
		this.#render(shadow);
	}

	#render(shadow) {
		const products = LocalStorageService.getProductsInCart();
		shadow.innerHTML += `
		  <section>
			<div id="carrito-lista">
			  <p>Lista de productos añadidos</p>
			  ${this.#renderListaCarrito(products)}
			</div>
		  </section>
		`;
	}

	#renderListaCarrito(products) {
		if (products.length === 0) {
			return '<p>No hay productos disponibles para mostrar</p>'
		}

		return `
			<ul>
				${products.map(producto => `<li>${producto.name} - ${producto.price}</li>`)}
			</ul>
		`
	}

	#agregaEstilo(shadow) {
		let link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "./src/pages/cart/cart.page.js");
		shadow.appendChild(link);
	}
}