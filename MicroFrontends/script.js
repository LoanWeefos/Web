import { HeaderComponent } from "./header/header.js";
import { ContentComponent } from "./content/content.js";
import { Content2Component } from "./content2/content2.js";
import { FooterComponent } from "./footer/footer.js";

window.customElements.define('header-info', HeaderComponent);
window.customElements.define('content-info', ContentComponent);
window.customElements.define('content2-info', Content2Component);
window.customElements.define('footer-info', FooterComponent);
