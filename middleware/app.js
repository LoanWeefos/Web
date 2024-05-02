const express = require('express');
const app = express();
const taskRoute = require('./routes/taskRoutes')
const { globalErrorHandler, AppError } = require('./utils/appError')
require('dotenv').config({ path: './variables.env' });
const morgan = require('morgan')
const asyncMiddleware = require ('./utils/catchAsync')

app.use(express.json());

app.use(morgan('combined'))

app.use('/api/tasks', taskRoute);

const hacerAlgoAsincrono = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const resultado = "resultado de la operacion asincrona"
            resolve(resultado)
        }, 2000)
    })
}

const operacionAsincrona = async (req, res) => {
    const resultado = await hacerAlgoAsincrono();
    res.json({ resultado })
}

app.get('/ruta', asyncMiddleware(operacionAsincrona));

app.all('*', (req, res, next) => {
    const error = new AppError(`No se pudo acceder a ${req.originalUrl} en el servidor`, 404);
    next(error);
})

app.use(globalErrorHandler)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Servidor Express escuchando en el puerto', PORT)
})