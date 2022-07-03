const { Router } = require('express');
const router = Router();
const {getAll, getById}  = require('../controllers/prodControllers')


const Contenedor = require("../contenedor.js");
const products_C = new Contenedor("productDB", "productsIds");


/* router.get('/:id?' , (req, res) => {
    const  { id } = req.params
    
    id ? res.send('hay id') : res.send('no hay id')
} ) */



//router.get('/', getAll)

router.get('/:id?' , async (req, res) => {
    const  { id } = req.params

    id ? getById(id) : getAll
    
}) 


module.exports = router;