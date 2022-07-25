import { Router } from "express"
const routerProd = Router();
import { getAll, getById, addProduct, updateProduct, deleteById} from "../controllers/prodControllers.js";

import Contenedor from "../contenedor.js";
const products_C = new Contenedor("productDB", "productsIds");

const isAdmin = (admin)=>{

    return ((req,res,next)=>{
        if (admin === true){
            next();
        } else{
            res.send('Acceso denegado')
        }
    })
  }

routerProd.get("/:id?", (req, res) => {
  const { id } = req.params;

  id ? getById(req.params.id, res) : getAll(res);
});


routerProd.post('/', isAdmin(true), (req, res) => {
    addProduct(req.body, res)
})

routerProd.put('/:id', isAdmin(true), (req, res) => {
    updateProduct(req, res)
})

routerProd.delete('/:id',isAdmin(true),  (req, res) => {
    deleteById(req, res)
})

export default routerProd


