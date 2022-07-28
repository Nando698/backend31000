import ContenedorFire from "../contenedores/contenedorFirebase.js";
const cart_C = new ContenedorFire("cartDB", "cartIds");

const addCart = async (cart, res) => {
  try {
    await cart_C.addCart(cart, res);
  } catch (e) {
    console.log("Error:", e);
  }
};

const getAll = async (res) => {
  try {
    res.send(await cart_C.getAll());
  } catch (e) {
    console.log("Error:", e);
  }
};

const deleteById = async (req, res) => {
  try {
    await cart_C.deleteById(req.params.id, res);
  } catch (e) {
    console.log("Error:", e);
  }
};

const searchByCart = async (req, res) => {
  try {
    await cart_C.searchByCart(req.params.id, res);
  } catch (e) {
    console.log("Error:", e);
  }
};

const addProductToCart = async (req, res) => {
  try {
    await cart_C.addProductToCart(req.params.id, req.body.id, res);
  } catch (e) {
    console.log("Error:", e);
  }
};

const deleteFromCart = async (req, res) => {
  try {
    await cart_C.deleteFromCart(req.params.id, req.params.id_prod, res);
  } catch (e) {
    console.log("Error:", e);
  }
};

export {
  addCart,
  getAll,
  deleteById,
  searchByCart,
  addProductToCart,
  deleteFromCart,
};

