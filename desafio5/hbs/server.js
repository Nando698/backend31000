const express = require('express');
const app = express();
const rutas = require('./routes/index.js')
const puerto = 8080;
const path = require('path')
const { engine } = require('express-handlebars');


//conf para acceder al body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


//Config handlebars
app.engine('hbs', engine({
        extname: '.hbs',
        defaultLayout: path.join(__dirname, './views/layout/main.hbs'),
        layoutsDir: path.join(__dirname, './views/layout'),
        partialsDir: path.join(__dirname, './views/partials')
    }))

    app.set('views', path.join(__dirname, './views'))
    app.set('view engine', 'hbs')



app.use('/', rutas);




app.listen(puerto, () => {
    
        console.log(`El servidor está escuchando el puerto: ${puerto}`)

})