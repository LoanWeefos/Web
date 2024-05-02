export class PostService { 
    #urlService = 'https://jsonplaceholder.typicode.com/posts/'
    #urlComments = '/comments/'

    async obtenerPost(postId) {
        let response = await fetch(this.#urlService + postId);
        let json = await response.json();
        return json;
    }

    async obtenerComentarios(postId) { 
        let response = await fetch(this.#urlService + postId + this.#urlComments);
        let json = await response.json();
        return json;
    }
}