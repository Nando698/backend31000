const express = require('express')
const app = express()
const path = require('path')
const { Server: IOServer } = require('socket.io')
const expressServer = app.listen(8080, () => console.log(`escuchando en puerto 8080`))
const io = new IOServer(expressServer)
const contenedor = require('./class.js')
const fs = require("fs");
const { Router } = require('express');
const router = Router();

const products = [{
        title: "Escuadra",
        price: 123.45,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        id: 1
    },
    {
        title: "Calculadora",
        price: 234.56,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        id: 2
    },
    {
        title: "Globo Terráqueo",
        price: 345.67,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        id: 3
    }
]


app.use(express.static(path.join(__dirname, './public')))





io.on('connection', async socket => {
        console.log('Se conecto un usuario nuevo', socket.id)
        socket.emit('server:products', products)

        socket.on('client:product', async product => {
            products.push(product)
            io.emit('server:product', product)
})
})

/* io.on("connection", async socket => {
    console.log("Nuevo usuario conectado")
    socket.emit("server:productos", contenedorProductos.productos)

    socket.on("client: producto", async producto =>{
        contenedorProductos.save(producto)

        io.emit("server:producto", producto)
    })
}) */