const express = require('express')
const app = express()
const path = require('path')
const { Server: IOServer } = require('socket.io')
const expressServer = app.listen(8080, () => console.log(`escuchando en puerto 8080`))
const io = new IOServer(expressServer)


const db = require("./database");




const ProductClass = require('./classProducts.js');
let products_C = new ProductClass(db.dbconnection, 'products');

const MsjClass = require('./classMsj.js');
let messages_C = new MsjClass(db.dblite, 'messages');



app.use(express.static(path.join(__dirname, './public')))





io.on('connection', async socket => {
        console.log('Se conecto un usuario nuevo', socket.id)
        socket.emit('server:products', await products_C.getAll())

        

        socket.on('client:product', async product => {
            products_C.save(product)
            io.emit('server:product', product)
})

        socket.emit('server:msgs', await messages_C.getAll());
        socket.on('client:msg', async msgInfo => {
            messages_C.save(msgInfo);
            io.emit('server:msgs', await messages_C.getAll())
        })

        socket.on('cliente:typing', typeValue => {
            socket.broadcast.emit('server:typing', typeValue)
        })

})

