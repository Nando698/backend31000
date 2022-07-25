import {
  Router
} from "express"
const routerCart = Router();
import {
  addCart,
  getAll,
  deleteById,
  searchByCart,
  addProductToCart,
  deleteFromCart,
} from "../controllers/cartControllers.js";

const isAdmin = (admin) => {

  return ((req, res, next) => {
    if (admin === true) {
      next();
    } else {
      res.send('Acceso denegado')
    }
  })
}


routerCart.get("/", isAdmin(true), (req, res) => {
  getAll(res);
});

routerCart.post("/", (req, res) => {
  addCart(req.body, res);
});

routerCart.delete("/:id", isAdmin(true), (req, res) => {
  deleteById(req, res);
});

routerCart.get("/:id/productos", isAdmin(true), (req, res) => {
  searchByCart(req, res);
});

routerCart.post("/:id/productos", (req, res) => {
  addProductToCart(req, res);
});

routerCart.delete("/:id/productos/:id_prod", (req, res) => {
  deleteFromCart(req, res);
});

export default routerCart