import { Crypto } from "./Crypto.js";

export class IndexedDBService {
    constructor(dbName, storeName) {
        this.dbName = dbName;
        this.storeName = storeName;
    }

    async setItem(key, value) {
        const encryptedValue = Crypto.encryptData(value);

        const db = await this.openDB();
        const tx = db.transaction(this.storeName, 'readwrite');
        const store = tx.objectStore(this.storeName);

        store.put({ key, value: encryptedValue });

        await tx.complete;
    }

    async getItem(key) {
        return new Promise((resolve, reject) => {
            try {
                this.openDB()
                    .then(db => {
                        const tx = db.transaction(this.storeName);
                        const store = tx.objectStore(this.storeName);

                        const request = store.get(key);

                        request.onsuccess = (event) => {
                            const result = event.target.result;
                            resolve(result ? Crypto.decryptData(result.value) : null);
                        };

                        request.onerror = () => {
                            console.error('Error al obtener el elemento desde IndexDB:', request.error);
                            reject(request.error);
                        };
                    })
                    .catch(error => {
                        console.error('Error al abrir la base de datos:', error);
                        reject(error);
                    });
            } catch (error) {
                console.error('Error al obtener el elemento desde IndexDB:', error);
                reject(error);
            }
        })
    }

    async openDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                db.createObjectStore(this.storeName, { keyPath: 'key' });
            };

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        })
    }
}