import Contenedor from "../contenedor.js";
const products_C = new Contenedor("productDB", "productIds");



const getAll = async (res) => {
    res.send(await products_C.getAll())
    
}

const getById = async (id, res)=>{
     return res.send(await products_C.getById(id))
}

const addProduct = async (producto, res) => {
    await products_C.save(producto, res)
    
}

const updateProduct = async (req, res) => {
    await products_C.updateProduct(req.body, req.params.id, res)
    
}

const deleteById = async (req, res) => {
    await products_C.deleteById(req.params.id, res)
}






export {getAll, getById, addProduct, updateProduct, deleteById}
