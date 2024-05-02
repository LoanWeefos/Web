import { LocalStorageService } from "../../services/localStorage.service.js";

export class HeaderComponent extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const shadow = this.attachShadow({ mode: "open" });
		this.#addStyles(shadow);
		this.#render(shadow);
		window.addEventListener('addToCart', (event) => this.#addToCartHandler(event.detail.product));
	}

	#render(shadow) {
		shadow.innerHTML += `
		<header>
			<div class="header-content">
				<h1>LITTLE SHOP</h1>
				<nav>
					<ul>
						<li><a href="/">HOME</a></li>
					</ul>
				</nav>
				<div class="cart-container">
					<li><a href="/cart"><img class="cart" src="./src/assets/images/cart-shopping.png" alt="cart"></a></li>
					<span class="cart-counter">0</span>
				</div>
			</div>
		</header>
	  	`;

		const cartCounter = this.shadowRoot.querySelector('.cart-counter');
		cartCounter.textContent = LocalStorageService.getProductsInCart().length;
	}

	#addToCartHandler(product) {
		const cartCounter = this.shadowRoot.querySelector('.cart-counter');
		let currentCount = parseInt(cartCounter.textContent);
		currentCount++;
		cartCounter.textContent = currentCount;
		alert("Se agrego un producto al carrito" + product.name);
	}

	#addStyles(shadow) {
		let link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "./src/components/header/header.component.css");
		shadow.appendChild(link);
	}
}