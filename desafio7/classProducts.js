const dbconnection = require("./database");

const createProductTable = require("./services");

class ProductClass {
  constructor(table) {
    this.table = table;
  }
  // Guardar mensaje

  async save(product) {
    try {
      await dbconnection(`${this.table}`).insert(product);

      console.log("Producto agregado!");

      //dbconnection.destroy();
    } catch (error) {
      if (error.code == "ER_NO_SUCH_TABLE") {
        createProductTable();
      } else {
        console.log(
          `Ocurrio el siguiente error al guardar el mensaje: ${error}`
        );
      }
    }
  }

  //Obtener productos

  async getAll() {
    const productsFromDB = await dbconnection.from(`${this.table}`).select("*");

    return productsFromDB;
  }

  // Eliminar producto

  async delete(id) {
    try {
      await dbconnection.from(`${this.table}`).where("id", "=", id).del();
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = ProductClass;
