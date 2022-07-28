import dotenv from "dotenv";
dotenv.config();

let Dao_product;
let Dao_cart;

switch ('firebase') {
  case "firebase":
    const { default: Dao_productFirebase } = await import(
      "./products/fireProducts.js"
    );
    const { default: dao_cartFirebase } = await import(
      "./carts/fireCart.js"
    );

    Dao_product = Dao_productFirebase;
    Dao_cart = dao_cartFirebase;

    break;
  case "mongo":
    const { default: dao_productMongo } = await import(
      "./products/mongoProducts.js"
    );
    const { default: dao_cartMongo } = await import(
      "./carts/mongoCart.js"
    );

    dao_product = dao_productMongo;
    dao_cart = dao_cartMongo;

    break;
}

export { Dao_product, Dao_cart };