const Contenedor = require("../contenedor.js");
const products_C = new Contenedor("productDB", "productsIds");



const getAll = async ( ) => {
    return res.send(await products_C.getAll())
    
}

const getById = async ( )=>{
    return res.send('hay id')
}





module.exports = {getAll, getById}