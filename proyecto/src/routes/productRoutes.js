const { Router } = require("express");
const router = Router();
const { getAll, getById, addProduct, updateProduct, deleteById} = require("../controllers/prodControllers");

const Contenedor = require("../contenedor.js");
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


router.post('/', isAdmin(false), (req, res) => {
    addProduct(req.body, res)
})

router.put('/:id', isAdmin(false), (req, res) => {
    updateProduct(req, res)
})

router.delete('/:id',isAdmin(true),  (req, res) => {
    deleteById(req, res)
})

module.exports = router;
