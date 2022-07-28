import express  from 'express';
const app = express();

import dotenv from "dotenv";
dotenv.config();



import router from './routes/routes.js';



const port = process.env.PORT || 3000;

//conf para acceder al body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${port}`)
});


app.get('/', (req, res) => {
    res.send('las rutas comienzan con " /api " !!')
})

app.use('/api/', router)

