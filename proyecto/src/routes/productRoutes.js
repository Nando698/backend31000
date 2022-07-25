import { Router } from "express"
const router = Router();
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

router.get("/:id?", (req, res) => {
  const { id } = req.params;

  id ? getById(req.params.id, res) : getAll(res);
});


router.post('/', isAdmin(true), (req, res) => {
    addProduct(req.body, res)
})

router.put('/:id', isAdmin(true), (req, res) => {
    updateProduct(req, res)
})

router.delete('/:id',isAdmin(true),  (req, res) => {
    deleteById(req, res)
})

export default router


