export class HelloWorld extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML += '<h1>Mi Primer MicroFrontend</h1>'
    }
}

window.customElements.define('hello-world', HelloWorld);