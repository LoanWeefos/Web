export class Content2Component extends HTMLElement {
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
        <section>
            <h2>MicroFrontend Content2</h2>
            <p>Este es el contenido que esta en el microfrontend llamado CONTENT-2</p>
        </section>
        `
    }

    #agregarEstilo(shadow) {
        let link = document.createElement('link');
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./content2/content2.css");
        shadow.appendChild(link);
    }
}