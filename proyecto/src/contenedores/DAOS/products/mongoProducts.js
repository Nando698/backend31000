import ContenedorMongo from "../../contenedorMongo";

class ProductoDaoMongo extends ContenedorMongo {
  constructor() {
    super("products", {
      nombre: { type: String, required: true },
      precio: { type: Number, required: true },
      thumbnail: { type: String, required: true },
    });
  }
}

export default ProductoDaoMongo;