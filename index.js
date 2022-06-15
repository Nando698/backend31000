const express = require('express')
const app = express()
const port = 8080

//no hace falta especificar archivo porque es index
const rutas = require('./routes')

app.use('/api', rutas)


app.listen(port, () => {
    try {
    console.log(`Servidor iniciado en puerto ${port}`)
    }catch(err) {
        console.log('ojota!!!',err)
    }
})

