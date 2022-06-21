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
    
    try{
        res.render('listado', {productos});
    }catch(error){
        console.log('error al intentar obtener el listado de productos :: ',error)
    }
})



//Agregar producto desde form (POST)
router.post('/', (req, res) => {
    
try {
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
    res.redirect('/')
}catch(error){
    console.log('error al postear', error)
    res.sendStatus(500)
}
})


//Consultar producto (GET)
router.get('/:id', (req, res) => {
    
   try { 
    let encontrado = productos.find(producto => producto.id == req.params.id);
    encontrado ? res.json(encontrado) : res.json({error: 'No existe ese ID'})
    } catch(error) {
        console.log('ocurrio un error desde el metodo GET por id, ', error)
    }
    })

 


//Actualizar producto via postman (PUT)
router.put('/:id', (req, res) => {
try{
    const id = Number(req.params.id);
    const index = productos.findIndex(producto => producto.id === id)
    const oldProd = productos[index]

  
    if (productos.find((prod) => prod.id === id)) {
      productos[index] = req.body;
      productos[index].id = id;

      res.json(
        `${JSON.stringify(oldProd)}   ha sido actualizado a:  ${JSON.stringify(
          productos[index]
        )}`
      );
    } else {
      res.json(`El producto con el id: ${id} no existe`);
    }
}catch(error){
    console.log('ha ocurrido un error en el metodo put')
}
})


//Eliminar producto (DELETE)
router.post('/eliminar/:id', (req, res) =>{
    
    try{
    const index = productos.findIndex((producto) => {
        return producto.id == req.params.id;
    });
    if (index === -1) {
        res.status(404)
    } else {
        productos.splice(index, 1);
        res.redirect('/productos')
    }
    }catch(error){
        console.log('ha ocurrido un error en el metodo DELETE')
    }
})





module.exports = router;