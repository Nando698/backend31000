const services = require("./services");

class ProductClass {
  constructor(config, table) {
    this.config = config
    this.table = table;
    
  }
  // Guardar producto

  async save(product) {
    try {
      await this.config(`${this.table}`).insert(product);

      console.log("Producto agregado!");

      
    } catch (error) {
      if (error.code == "ER_NO_SUCH_TABLE") {
        services.createProductTable();
      } else {
        console.log(
          `Ocurrio el siguiente error al guardar el mensaje: ${error}`
        );
      }
    }
  }
  
  //Obtener productos

  async getAll() {

    try{
    const productsFromDB = await this.config.from(`${this.table}`).select("*");
    
    return productsFromDB;
  } catch (error) {
    if (error.code == "ER_NO_SUCH_TABLE") {
      services.createProductTable();
    } else {
      console.log(
        `Ocurrio el siguiente error al guardar el mensaje: ${error}`
      );
    }
  }
  }

  // Eliminar producto

  async delete(id) {
    try {
      await this.config.from(`${this.table}`).where("id", "=", id).del();
    } catch (e) {
      console.log(e);
    }
  }
}



module.exports = ProductClass;
