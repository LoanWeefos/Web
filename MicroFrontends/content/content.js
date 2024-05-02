export class ContentComponent extends HTMLElement {
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
            <h2>MicroFrontend Content</h2>
            <p>Este es el contenido que esta en el microfrontend llamado CONTENT</p>
        </section>
        `
    }

    #agregarEstilo(shadow) {
        let link = document.createElement('link');
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./content/content.css");
        shadow.appendChild(link);
    }
}