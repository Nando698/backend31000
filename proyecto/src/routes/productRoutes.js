const { Router } = require("express");
const router = Router();
const { getAll, getById, addProduct, updateProduct, deleteById} = require("../controllers/prodControllers");

const Contenedor = require("../contenedor.js");
const products_C = new Contenedor("productDB", "productsIds");



router.get("/:id?", (req, res) => {
  const { id } = req.params;

  id ? getById(req.params.id, res) : getAll(res);
});


router.post('/', (req, res) => {
    addProduct(req.body, res)
})

router.put('/:id', (req, res) => {
    updateProduct(req, res)
})

router.delete('/:id', (req, res) => {
    deleteById(req, res)
})

module.exports = router;
