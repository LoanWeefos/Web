
// Modulos clases que se necesitan
const fs = require('fs');
const readline = require('readline');
const Alumno = require('./alumnos');
const Carrera = require('./carreras');

const rl = readline.createInterface({
    input: process.stdin, //proceso de entrada (pregunta o instrucciones para leer entrada de datos)
    output: process.stdout //funcion que procesa el dato recibido en el input lo transforma y genera un output
});

const dataFolder = './data/';
const alumnosFile = dataFolder + 'alumnos.json';
const carrerasFile = dataFolder + 'carreras.json';

let alumnos = [];
let carreras = [];

function cargarDatos() {
    try {
        const alumnosData = fs.readFileSync(alumnosFile, 'utf8');
        const carrerasData = fs.readFileSync(carrerasFile, 'utf8');

        // Parsear los datos JSON y cargar en los arreglos correspondientes
        alumnos = JSON.parse(alumnosData);
        carreras = JSON.parse(carrerasData);

        console.log('Datos cargados exitosamente.');
    } catch (error) {
        console.error('Error al cargar datos:', error.message);
    }
}

function guardarDatos() {
    try {
        // Convertir los arreglos a formato JSON
        const alumnosJSON = JSON.stringify(alumnos, null, 2);
        const carrerasJSON = JSON.stringify(carreras, null, 2);

        // Guardar los datos en los archivos correspondientes
        fs.writeFileSync(alumnosFile, alumnosJSON, 'utf8');
        fs.writeFileSync(carrerasFile, carrerasJSON, 'utf8');

        console.log('Datos guardados exitosamente.');
    } catch (error) {
        console.error('Error al guardar datos:', error.message);
    }
}

function mostrarMenuPrincipal() {
    console.log('\n** Menú **');
    console.log('1. Alumnos');
    console.log('2. Carreras');
    console.log('3. Salir');
}

function mostrarSubMenuEntidad(entidad) {
    console.log(`\n** ${entidad} **`);
    console.log('1. Ver listado');
    console.log('2. Agregar');
    console.log('3. Borrar');
    console.log('4. Cambiar');
    console.log('5. Agregar alumno a carrera');
    console.log('6. Volver al menú principal');
}

function mostrarListado(entidad) {
    if (entidad === 'alumnos') {
        alumnos.forEach(alumno => {
            console.log(`ID: ${alumno.id}, Nombre: ${alumno.nombre}, Carrera: ${alumno.carrera ? alumno.carrera : 'Sin asignar'}`);
        });
    } else if (entidad === 'carreras') {
        carreras.forEach(carrera => {
            console.log(`ID: ${carrera.id}, Nombre: ${carrera.nombre}`);
        });
    } else {
        console.log('Entidad no válida.');
    }
}


function agregar(entidad, clase) {
    rl.question(`Ingrese el nombre del nuevo ${entidad}: `, nombre => {
        // Generar un nuevo ID (puedes utilizar alguna lógica para generar IDs únicos)
        const nuevoId = obtenerNuevoId(clase);

        // Crear una nueva instancia de la clase (Alumno o Carrera)
        const nuevoElemento = new clase(nuevoId, nombre);

        // Añadir el nuevo elemento a la lista correspondiente
        if (clase === Alumno) {
            alumnos.push(nuevoElemento);
        } else if (clase === Carrera) {
            carreras.push(nuevoElemento);
        }

        console.log(`${entidad.charAt(0).toUpperCase() + entidad.slice(1)} agregado correctamente.`);
        
        // Guardar los cambios en el archivo JSON
        guardarDatos();

        // Volver al menú principal
        seleccionarAccionPrincipal();
    });
}

//NUEVO MÉTODO PARA OBTENER NUEVO ID
function obtenerNuevoId(clase) {
    let idsExistentes;

    if (clase === Alumno) {
        idsExistentes = alumnos.map(alumno => alumno.id);
    } else if (clase === Carrera) {
        idsExistentes = carreras.map(carrera => carrera.id);
    }

    const maxId = Math.max(...idsExistentes, 0);

    return maxId + 1;
}

function borrar(entidad, clase) {
    mostrarListado(entidad);
    rl.question(`Ingrese el ID del ${entidad} que desea borrar: `, id => {
        // Convertir el ID a número (si es necesario)
        id = parseInt(id);

        // Buscar el índice del elemento a borrar
        const index = encontrarIndicePorId(id, clase);

        if (index !== -1) {
            // Eliminar el elemento de la lista
            clase === Alumno ? alumnos.splice(index, 1) : carreras.splice(index, 1);
            
            console.log(`${entidad.charAt(0).toUpperCase() + entidad.slice(1)} borrado correctamente.`);

            // Guardar los cambios en el archivo JSON
            guardarDatos();

            // Volver al menú principal
            seleccionarAccionPrincipal();
        } else {
            console.log(`${entidad.charAt(0).toUpperCase() + entidad.slice(1)} con ID ${id} no encontrado.`);
            borrar(entidad, clase); // Volver a solicitar el ID
        }
    });
}

//NUEVO MÉTODO PARA ENCONTRAR LA ENTIDAD APARTIR DE SU ID
function encontrarIndicePorId(id, clase) {
    // Encuentra el índice del elemento en el array por su ID
    return clase === Alumno ? alumnos.findIndex(alumno => alumno.id === id) : carreras.findIndex(carrera => carrera.id === id);
}

function cambiar(entidad, clase) {
    mostrarListado(entidad);
    rl.question(`Ingrese el ID del ${entidad} que desea cambiar: `, id => {
        // Convertir el ID a número (si es necesario)
        id = parseInt(id);

        // Buscar el índice del elemento a cambiar
        const index = encontrarIndicePorId(id, clase);

        if (index !== -1) {
            rl.question(`Ingrese el nuevo nombre para el ${entidad} con ID ${id}: `, nuevoNombre => {
                // Modificar el elemento en la lista
                clase === Alumno ? alumnos[index].nombre = nuevoNombre : carreras[index].nombre = nuevoNombre;
                
                console.log(`${entidad.charAt(0).toUpperCase() + entidad.slice(1)} cambiado correctamente.`);

                // Guardar los cambios en el archivo JSON
                guardarDatos();

                // Volver al menú principal
                seleccionarAccionPrincipal();
            });
        } else {
            console.log(`${entidad.charAt(0).toUpperCase() + entidad.slice(1)} con ID ${id} no encontrado.`);
            cambiar(entidad, clase); // Volver a solicitar el ID
        }
    });
}

function asignarAlumnoACarrera() {
    mostrarListado('alumnos');
    rl.question(`Ingrese el ID del alumno que desea asignar a una carrera: `, idAlumno => {
        // Convertir el ID a número (si es necesario)
        idAlumno = parseInt(idAlumno);

        // Buscar el índice del alumno en el array
        const indexAlumno = encontrarIndicePorId(idAlumno, Alumno);

        if (indexAlumno !== -1) {
            // Obtener la carrera actual del alumno
            const carreraActual = alumnos[indexAlumno].carrera;

            // Si el alumno ya está asignado a una carrera, eliminarlo de esa carrera
            if (carreraActual) {
                const indexCarreraActual = encontrarIndicePorNombre(carreraActual, Carrera);
                if (indexCarreraActual !== -1) {
                    const indexAlumnoEnCarrera = carreras[indexCarreraActual].alumnos.findIndex(alumno => alumno.id === idAlumno);
                    if (indexAlumnoEnCarrera !== -1) {
                        carreras[indexCarreraActual].alumnos.splice(indexAlumnoEnCarrera, 1);
                    }
                }
            }

            // Mostrar las carreras disponibles
            mostrarListado('carreras');
            rl.question(`Ingrese el ID de la carrera a la que desea asignar al alumno: `, idCarrera => {
                // Convertir el ID a número (si es necesario)
                idCarrera = parseInt(idCarrera);

                // Buscar el índice de la carrera en el array
                const indexCarrera = encontrarIndicePorId(idCarrera, Carrera);

                if (indexCarrera !== -1) {
                    // Asignar la carrera al alumno
                    alumnos[indexAlumno].carrera = carreras[indexCarrera].nombre;

                    // Asignar el alumno a la nueva carrera
                    carreras[indexCarrera].alumnos.push(alumnos[indexAlumno]);

                    console.log(`Alumno asignado a la carrera correctamente.`);

                    // Guardar los cambios en el archivo JSON
                    guardarDatos();

                    // Volver al menú principal
                    seleccionarAccionPrincipal();
                } else {
                    console.log(`Carrera con ID ${idCarrera} no encontrada.`);
                    asignarAlumnoACarrera(); // Volver a solicitar el ID de la carrera
                }
            });
        } else {
            console.log(`Alumno con ID ${idAlumno} no encontrado.`);
            asignarAlumnoACarrera(); // Volver a solicitar el ID del alumno
        }
    });
}

//NUEVO MÉTODO PARA ENCONTRAR LA CARRERA
function encontrarIndicePorNombre(nombre, clase) {
    return clase === Alumno ? alumnos.findIndex(alumno => alumno.nombre === nombre) : carreras.findIndex(carrera => carrera.nombre === nombre);
}



function seleccionarAccionPrincipal() {
    cargarDatos();
    mostrarMenuPrincipal();
    rl.question('Seleccione una opción: ', opcion => {
        switch (opcion) {
            case '1':
                seleccionarAccionEntidad('alumnos');
                break;
            case '2':
                seleccionarAccionEntidad('carreras');
                break;
            case '3':
                console.log('¡Hasta luego!');
                guardarDatos();
                rl.close();
                break;
            default:
                console.log('Opción no válida.');
                seleccionarAccionPrincipal();
        }
    });
}

// Modifica la función para seleccionar acción en entidad (listado, agregar, borrar, cambiar)
function seleccionarAccionEntidad(entidad) {
    cargarDatos();
    mostrarSubMenuEntidad(entidad);
    rl.question(`Seleccione una opción en ${entidad}: `, opcion => {
        switch (opcion) {
            case '1':
                mostrarListado(entidad);
                seleccionarAccionEntidad(entidad);
                break;
            case '2':
                agregar(entidad, entidad === 'alumnos' ? Alumno : Carrera);
                break;
            case '3':
                borrar(entidad, entidad === 'alumnos' ? Alumno : Carrera);
                break;
            case '4':
                cambiar(entidad, entidad === 'alumnos' ? Alumno : Carrera);
                break;
            case '5':
                asignarAlumnoACarrera();
                break;
            case '6':
                seleccionarAccionPrincipal();
                break;
            default:
                console.log('Opción no válida.');
                seleccionarAccionEntidad(entidad);
        }
    });
}

// Iniciar el programa
seleccionarAccionPrincipal();
