/* const funcionConCallback = (num1, num2, callback) => {
    const resultado = num1 + num2;
    return setTimeout(() => {
        callback(resultado);
    }, 1500);
}

funcionConCallback(10, 10, (resultado) => {
    console.log(resultado);
});
console.log('123');

const funcionConPromesa = (num1,num2) => {
    const resultado = num1 + num2;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(resultado)
        }, 1500)
    })
}
funcionConPromesa(10, 10).then(respuesta => console.log(respuesta));
console.log('123'); */

/* const funcionConPromesaThen = (num1, num2) => {
    const resultado = num1 + num2;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(resultado)
        }, 1500)
    })
}

async function main() {
    await funcionConPromesaThen(10, 20).then(res => {
        console.log(res);
        console.log('123');
        return new Promise(res => {
            setTimeout(() => {
                resolve(res * 10)
            }, 1500)
        })
    }).then(resultadoMultiplicacion => {
        console.log(resultadoMultiplicacion)
    })
}

main(); */

/* const funcionConPromesa = (num1,num2) => {
    const resultado = num1 + num2;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(resultado)
        }, 1500)
    })
}

async function main(){
    await funcionConPromesa(10,20).then(respuesta => console.log(respuesta));
    console.log('123')
}

main(); */

const funcionConPromesa = async (num1, num2) => {
    return new Promise((resolve, reject) => {
        if (num2 === 0) {
            reject(new Error('División por cero'))
        } else {
            const resultado = num1 / num2;
            setTimeout(() => {
                resolve(resultado)
            }, 1500);
        }
    })
}

funcionConPromesa(100, 0)
    .then(res => {
        tr
        console.log(res)
    }).catch(reject => {
        console.log(reject)
    })