export class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback(){
        const shadow =  this.attachShadow({mode: 'open'})
        this.#agregarEstilo(shadow);
        this.#render(shadow);
    }

    #render(shadow) {
        shadow.innerHTML += `
        <header>
            <h1>ESTE ES EL HEADER DEL SITIO</h1>
        </header>
        `
    }

    #agregarEstilo(shadow) {
        let link = document.createElement('link');
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./header/header.css");
        shadow.appendChild(link);
    }
}