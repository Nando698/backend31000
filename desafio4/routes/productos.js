const { Router } = require('express');
const router = Router();
const productos = [
    {
    "title": "Escuadra",
    "price": 123.45,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    "id": 1
    },
    {
    "title": "Calculadora",
    "price": 234.56,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    "id": 2
    },
    {
    "title": "Globo Terráqueo",
    "price": 345.67,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    "id": 3
    }
   ]

//Mostrar productos (GET)
router.get('/', (req, res) => {
    res.json(productos);
})



//Agregar producto desde form (POST)
router.post('/', (req, res) => {
    const { title, price, thumbnail} = req.body
    let ultimo = productos.length - 1;
    let id = productos[ultimo].id + 1;
    productos.push({ id, title, price, thumbnail});
    res.send(productos[ultimo+1]);
})


//Consultar producto (GET)
router.get('/:id', (req, res) => {
    let encontrado = productos.find(producto => producto.id == req.params.id);
    let resultado;
    if(encontrado){
        resultado = encontrado;
    } else {
        resultado = {error: 'El producto no existe'};
    }
    res.json(resultado);
})


//Actualizar producto via postman (PUT)
router.put('/:id', (req, res) => {
    let resultado
    const indice = productos.findIndex((producto) => {
        return producto.id == req.params.id;
    });
    if (indice === -1) {
        resultado = {error: 'El producto no existe'}
    } else {
        productos[indice].title = req.body.title
        productos[indice].price = req.body.price
        productos[indice].thumbnail = req.body.thumbnail

        resultado = "Producto actualizado con exito"
    }
    res.json(resultado)
})





module.exports = router; 