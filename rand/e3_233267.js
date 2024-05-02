/* function showMessage(callback){
    setTimeout(()=>{
        callback("Mensaje mostrado después de 3 segundos");
    }, 3000)
}

showMessage((message) =>{
    console.log(message);
}) */

/* function operate(x, y, operation, callback) {
    let result;
    switch (operation) {
        case "add":
            result = x + y;
            break;
        case "sub":
            result = x - y;
            break;
        case "mul":
            result = x * y;
            break;
        case "div":
            result = x / y;
            break;

        default:
            result = "Operacion no válida"
    }
    callback(result);
}

operate(10, 10, "add", (result) => {
    console.log("Resultado", result)
}) */

function cortarIngredientes(ingredientes, callback) {
    setTimeout(() => {
        console.log(`Cortando: ${ingredientes}`)
        callback();
    }, 1000);
}

function cocinar(accion, callback) {
    setTimeout(() => {
        console.log(`Cocinando: ${accion}`)
        callback();
    }, 1500);
}

function servirPlato(plato) {
    console.log(`¡Listo! Puedes disfrutar de: ${plato}`)
}

function prepararReceta(plato, callback) {
    console.log(`Comenzando a preparar ${plato}`);
    cortarIngredientes("vegetales", () => {
        cocinar("saltear", () => {
            cortarIngredientes("pollo", () => {
                cocinar("freir", () => {
                    cocinar("mezclar todo", () => {
                        servirPlato(plato);
                        callback();
                    })
                })
            })
        })
    })
}

prepararReceta("Pollo al wok", () => {
    console.log("Receta completada");
})