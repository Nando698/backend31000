const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  /* METODO SAVE */

  async save(objeto) {
    let data = await fs.promises.readFile(`./${this.archivo}`, "utf-8");

    try {
      if (!data) {
        let id = JSON.parse(await fs.promises.readFile("./ids.txt", "utf-8"));
        let maxID = Math.max(...id);
        objeto.id = maxID + 1;
        id = [...id, objeto.id];
        await fs.promises.writeFile(`./ids.txt`, JSON.stringify(id));

        await fs.promises.writeFile(
          `./${this.fileName}`,
          JSON.stringify(objeto)
        );
      } else {
        // Obtengo ID desde un archivo independiente
        let id = JSON.parse(await fs.promises.readFile("./ids.txt", "utf-8"));
        let maxID = Math.max(...id);
        objeto.id = maxID + 1;
        id = [...id, objeto.id];
        await fs.promises.writeFile(`./ids.txt`, JSON.stringify(id));

        //Obtengo los productos del archivo
        let productos = JSON.parse(
          await fs.promises.readFile("./productos.txt", "utf-8")
        );

        //Agrego el producto y reescribo el archivo
        productos.push(objeto);

        await fs.promises.writeFile(
          `./${this.archivo}`,
          JSON.stringify(productos)
        );

        console.log("Producto agregado con el ID ", objeto.id);
      }
    } catch (error) {
      console.log("[[[ error en metodo save ]]]", error);
    }
  }

  /* METODO GET BY ID */

  async getById(id) {
    //Obtengo los productos del archivo
    let productos = JSON.parse(
      await fs.promises.readFile("./productos.txt", "utf-8")
      );
      
      try {

      let objeto = productos.find((prod) => prod.id == id);

      console.log(objeto ? objeto : "ese ID no existe");
    } catch (error) {
      console.log("[[[ error en metodo getById ]]]", error);
    }
  }

  /* METODO GETALL */

  async getAll() {
    try {
      let productos = JSON.parse(
        await fs.promises.readFile("./productos.txt", "utf-8")
      );
      console.log(productos);
    } catch (error) {
      console.log("[[[ error desde metodo getAll ]]]", error);
    }
  }

  /* METODO DELETE BY ID */

  async deleteById(id) {
    let productos = JSON.parse(
      await fs.promises.readFile("./productos.txt", "utf-8")
      );
      
      try {
      
        if (productos.some((prod) => prod.id == id)) {
        let newProductos = productos.filter((prod) => prod.id != id);

        await fs.promises.writeFile(
          `./${this.archivo}`,
          JSON.stringify(newProductos)
        );
        console.log("producto eliminado");
      } else {
        console.log("no existe producto con ese id");
      }
    } catch (error) {
      console.log("[[[ error desde metodo deleteAll ]]]", error);
    }
  }

  /* METODO DELETE ALL */

  async deleteAll() {
    
    let archivo = await fs.promises.readFile(`./${this.archivo}`, "utf-8");
    
    try {
    
      if (!archivo) {
        console.log("ese archivo no existe");
      } else {
        await fs.promises.writeFile(`./${this.archivo}`, "[]");

        console.log("Todos los archivos han sido eliminados");
      }
    } catch (error) {
      console.log("[[[ error desde metodo deleteAll ]]]", error);
    }
  }
}

/* TESTEO DE METODOS */

//new Contenedor('productos.txt').save({nombre: 'shampoo', precio: 200, thumbnail: 'ejemplo url'})

//new Contenedor('productos.txt').getById(12)

//new Contenedor('productos.txt').getAll()

//new Contenedor('productos.txt').deleteById(12)

//new Contenedor('productos.txt').deleteAll()
