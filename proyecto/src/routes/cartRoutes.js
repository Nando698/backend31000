const { Router } = require("express");
const router = Router();
const {
  addCart,
  getAll,
  deleteById,
  searchByCart,
  addProductToCart,
  deleteFromCart,
} = require("../controllers/cartControllers");

router.get("/", (req, res) => {
  getAll(res);
});

router.post("/", (req, res) => {
  addCart(req.body, res);
});

router.delete("/:id", (req, res) => {
  deleteById(req, res);
});

router.get("/:id/productos", (req, res) => {
  searchByCart(req, res);
});

router.post("/:id/productos", (req, res) => {
  addProductToCart(req, res);
});

router.delete("/:id/productos/:id_prod", (req, res) => {
  deleteFromCart(req, res);
});

module.exports = router;
