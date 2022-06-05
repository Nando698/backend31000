const express = require('express')
const app = express()
const port = 8080
let contador = 0
let fecha = new Date()

app.listen(port, () => {
    try {
    console.log(`Servidor iniciado en puerto ${port}`)
    }catch(err) {
        console.log('ojota!!!',err)
    }
})


app.get('/', (req, res) => {
    res.send(

       ` <h1 style="color: blue" >Bienvenido al servidor de NANDO</h1> `

    )
} )


app.get('/visitas', (req, res) => {
    
    contador += 1
    
    
    res.send(

       ` visitante nro ${contador}`

    )
} )


app.get('/fyh', (req, res) => {
    
    
    
    
    res.json(

       fecha
    )
} )