function eliminarDuplicados(array) {
    var arraySinDuplicados = [];

    for (var i = 0; i < array.length; i++) {
        var num = array[i];
        var esDuplicado = false;

        for (var j = 0; j < arraySinDuplicados.length; j++) {
            if (num === arraySinDuplicados[j]) {
                esDuplicado = true;
                break;
            }
        }

        if (!esDuplicado) {
            arraySinDuplicados.push(num);
        }
    }

    return arraySinDuplicados;
}

const arrayOriginal = [1, 2, 3, 4, 1, 2, 5];
const arraySinDuplicados = eliminarDuplicados(arrayOriginal);

console.log(arraySinDuplicados);
