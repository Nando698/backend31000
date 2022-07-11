const dbconnection = require("./database");

const createMsjTable = require("./services");

class Contenedor {
    constructor(config, table) {
      
    }

// Guardar mensaje

    async save(message) {
      try{
         
        
        const msj = `FechaYHora: ${message.time}, UserName: ${message.username}, Mensaje: ${message.message}\n`;
          await fs.promises.appendFile(`./desafio6/chat.txt`, msj);
          console.log("Mensaje guardado correctamente")
      
      
        } catch(error) {
          console.log(`Ocurrio el siguiente error al guardar el mensaje: ${error}`)
      }
  }


//Obtener mensajes

  async getAll () {
    //leo el archivo y lo guardo en una variable que luego retorno
    let listadoMsg = JSON.parse(await fs.promises.readFile(`./${this.archivo}.txt`, 'utf-8'));
    console.log("Listado de mensajes: ", listadoMsg);
    return listadoMsg;
}
}

  module.exports = Contenedor