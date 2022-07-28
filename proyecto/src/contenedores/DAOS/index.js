import dotenv from "dotenv";
dotenv.config();

let Dao_product;
let Dao_cart;

switch (process.env.DATABASE || 'mongo') {
  case "firebase":
    const { default: Dao_productFirebase } = await import(
      "./products/fireProducts.js"
    );
    const { default: Dao_cartFirebase } = await import(
      "./carts/fireCart.js"
    );

    Dao_product = new Dao_productFirebase;
    Dao_cart = new Dao_cartFirebase;

    break;
  case "mongo":
    const { default: Dao_productMongo } = await import(
      "./products/mongoProducts.js"
    );
    const { default: Dao_cartMongo } = await import(
      "./carts/mongoCart.js"
    );

    Dao_product = new Dao_productMongo;
    Dao_cart = new Dao_cartMongo;

    break;
}

export { Dao_product, Dao_cart };