const Contenedor = require("../contenedor");
const cart_C = new Contenedor("cartDB", "cartIds");


const addCart = async (cart, res) => {
    await cart_C.save(cart, res)
    
}

const getAll = async (res) => {
    res.send(await cart_C.getAll())
    
}

const deleteById = async (req, res) => {
    await cart_C.deleteById(req.params.id, res)
}

const searchByCart = async (req, res) => {
    await cart_C.searchByCart(req.params.id, res)
}

const addProductToCart = async (req, res) => {
    await cart_C.addProductToCart(req.params.id, req.body.id, res)
}



module.exports = {addCart, getAll, deleteById,searchByCart, addProductToCart }