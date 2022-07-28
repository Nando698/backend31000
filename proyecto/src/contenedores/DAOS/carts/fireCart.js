import ContenedorFirebase from "../../contenedorFirebase.js";

class Dao_cartFirebase extends ContenedorFirebase {
  constructor() {
    super("carts");
  }
}

export default Dao_cartFirebase;