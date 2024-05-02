const readlineSync = require('readline-sync');
//Luis Esteban Durán Quintanar - 00000233267

function calularMax() {
  let numeros = [];
  let numero;
  let maximo = 0;
  let repeticiones = 0;

  do {
    numero = readlineSync.questionInt('Introduce un numero entero positivo (0 para terminar): ');

    if (numero > maximo) {
      maximo = numero;
      repeticiones = 1;
    } else if (numero === maximo) {
      repeticiones++;
    }

    if (numero !== 0) {
      numeros.push(numero);
    }
  } while (numero !== 0);

  console.log('\nLista de números: ${numeros.join(', ')}');
  console.log('El valor máximo es: ${maximo}');
  console.log('Aparece ${repeticiones} veces.');
}

calularMax();