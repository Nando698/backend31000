import express  from 'express';
const app = express();

import routerCart from './routes/cartRoutes.js';

import routerProd from './routes/productRoutes.js';

const port = process.env.port || 8080;

//conf para acceder al body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${port}`)
});


app.get('/', (req, res) => {
    res.send('HOME')
})

app.use('/api/cart', routerCart)

app.use('/api/products', routerProd)