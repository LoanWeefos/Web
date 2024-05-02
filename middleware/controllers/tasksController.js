const { AppError } = require('../utils/appError')
const tasks = [];

const getTasks = (req, res) => {
    res.json(tasks)
}

const addTask = (req, res) => {
    const { nombre, email } = req.body;

    if (!nombre || !email) {
        throw new AppError('Faltan campos obligatorios', 500)
    }

    const expresionRegular = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!expresionRegular.test(email)) {
        throw new AppError('Correo Invalido', 500)
    }

    const task = {
        nombre: nombre,
        email: email
    }

    tasks.push(task);
    res.json(task)
}

const deleteTask = (req, res) => {
    const { index } = req.params;

    if (index >= 0 && index < tasks.length) {
        const deleteTask = tasks.splice(index, 1);
        res.json(deleteTask);
    } else {
        throw new AppError('Tarea no encontrada', 404)
    }
}

module.exports = {
    getTasks,
    addTask,
    deleteTask
}