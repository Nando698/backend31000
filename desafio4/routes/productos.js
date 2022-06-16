const {
    Router
} = require('express');
const router = Router();
const productos = [{
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
    const {
        title,
        price,
        thumbnail
    } = req.body
    let ultimo = productos.length - 1;
    let id = productos[ultimo].id + 1;
    productos.push({
        id,
        title,
        price,
        thumbnail
    });
    res.send(productos[ultimo + 1]);
})


//Consultar producto (GET)
router.get('/:id', (req, res) => {
    let encontrado = productos.find(producto => producto.id == req.params.id);
    let resultado;
    if (encontrado) {
        resultado = encontrado;
    } else {
        resultado = {
            error: 'El producto no existe'
        };
    }
    res.json(resultado);
})


//Actualizar producto via postman (PUT)
router.put('/:id', (req, res) => {
    
    const id = Number(req.params.id);
    const index = productos.findIndex(producto => producto.id === id)
    const oldProd = productos[index]

  
    if (productos.find((prod) => prod.id === id)) {
      
    
      productos[index] = req.body
      productos[index].id = id
      
  
      res.json(`${JSON.stringify( oldProd )}   ha sido actualizado a:  ${JSON.stringify( productos[index] )}`);

    } else {
      res.json(`El producto con el id: ${id} no existe`);
}

})


//Eliminar producto (DELETE)
router.delete('/:id', (req, res) =>{
    const index = productos.findIndex((producto) => {
        return producto.id == req.params.id;
    });
    let resultado = "";
    if (index === -1) {
        resultado = {error: 'El producto no existe'}
    } else {
        productos.splice(index, 1);
        resultado = "Producto eliminado con éxito"
    }
    res.json(resultado);
})





module.exports = router;