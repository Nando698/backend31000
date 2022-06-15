const express = require('express');
const app = express();
const rutas = require('./routes/index.js')
const puerto = 8080;


//conf para acceder al body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', express.static( __dirname + '/public' ));


app.use('/api', rutas);




app.listen(puerto, () => {
    
        console.log(`El servidor está escuchando el puerto: ${puerto}`)

})