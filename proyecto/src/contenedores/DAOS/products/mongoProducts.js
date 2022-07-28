import ContenedorMongo from "../../contenedorMongo.js";

class Dao_productMongo extends ContenedorMongo {
  constructor() {
    super("products", {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      thumbnail: { type: String, required: true },
    });
  }
}

export default Dao_productMongo;