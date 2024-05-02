import { Crypto } from "./Crypto.js";
export class SessionStorageService{
    constructor(){}

    static setItem(key, value){
        const encryptedData = Crypto.encryptData(value);
        sessionStorage.setItem(key, encryptedData);
    }

    static getItem(key){
        const encryptData = sessionStorage.getItem(key);
        return Crypto.decryptData(encryptData);
    }
}