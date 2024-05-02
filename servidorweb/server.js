const express = require('express');
const app = express();

app.use(express.static('./public'));
app.use(express.json())

app.get('/holamundo', (req, res) => {
    res.send('SEGUNDO PUNTO DE LA TAREA 🤓✌️')
})

app.get('/algo', (req, res) => {
    res.send('Hola mundo, este es mi primer servidor con node.js y express tilin')
})

app.post('/algo', (req, res) => {
    res.send('Hola mundo ALGO POST!')
})

app.delete('/algo', (req, res) => {
    res.send('Hola mundo ALGO DELETE!')
})

app.post('/profile/:id', (req, res, next) => {
    console.log(req.params.id)
    console.log(req.query.id)
    console.log(req.query.usr)
    console.log(req.body);
    res.json(req.body);
})

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000')
})