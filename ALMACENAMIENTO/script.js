import { LocalStorageService } from "./services/LocalStorage.service.js";
import { SessionStorageService } from "./services/SessionStorage.service.js";
import { CookieService } from "./services/CookieService.js";
import { IndexedDBService } from "./services/IndexedDB.service.js";

let user = { nombre: 'John Doe', edad: '25' }

//LocalStorage
LocalStorageService.setItem('user', user);
console.log('Este es el usuario obtenido desde Local Storage: ', LocalStorageService.getItem('user'));

//SessionStorage
SessionStorageService.setItem('user', user);
console.log('Este es el usuario obtenido desde Session Storage: ', SessionStorageService.getItem('user'));

//Cookies
CookieService.setCookie('user', user, 7);
console.log('Este es el usuario obtenido desde la Cookie: ', CookieService.getCookie('user'));

//IndexedDB
const base = new IndexedDBService("miDB", "miStore");
await base.setItem('user', user);
console.log('Este es el usuario obtenido desde la IndexedDB: ', await base.getItem('user'));