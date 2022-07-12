const db = require("./database");
const services = require('./services')


class MsjClass {
  constructor(config, table) {
    this.config = config
    this.table = table;
  }

  // Guardar mensaje

  async save(message) {
    try {
      await this.config(`${this.table}`).insert(message);
    } catch (error) {
      if (error.code == "ER_NO_SUCH_TABLE") {
        services.createMsjTable();
      } else {
        console.log(
          `Ocurrio el siguiente error al guardar el mensaje: ${error}`
        );
      }
    }
  }

  //Obtener mensajes

  async getAll() {
    try{

    const allMesages = await this.config.from(`${this.table}`).select("*");

    return allMesages;

  } catch (error) {
    if (error.code == "ER_NO_SUCH_TABLE") {
      services.createMsjTable();
    } else {
      console.log(
        `Ocurrio el siguiente error al recuperar los mensajes: ${error}`
      );
    }
  }
  }
}

module.exports = MsjClass;
