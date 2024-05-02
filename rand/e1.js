function reemplazarPalabra(cadena, pAnt, pNue) {
    var expresionRegular = new RegExp(pAnt, 'g');
    
    var nuevaCadena = cadena.replace(expresionRegular, pNue);
    
    return nuevaCadena;
}

console.log(reemplazarPalabra("Esto es una palabra", "palabra", "reemplazo"));
  