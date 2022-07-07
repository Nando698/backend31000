const express = require('express');
const app = express();
const cartRoutes = require('./routes/cartRoutes')
const productRoutes = require('./routes/productRoutes')
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

app.use('/api/cart', cartRoutes)

app.use('/api/products', productRoutes)