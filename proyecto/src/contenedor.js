const fs = require("fs");

class Contenedor {
  constructor(database, idDb) {
    this.database = database;
    this.idDb = idDb;
  }

  /* METODO SAVE */

  async save(objeto, res) {
    let data = JSON.parse(
      await fs.promises.readFile(`./proyecto/src/${this.database}.txt`, "utf-8")
    );

    try {
      if (!data) {
        let id = JSON.parse(
          await fs.promises.readFile(`./proyecto/src${this.idDb}.txt`, "utf-8")
        );
        let maxID = Math.max(...id);
        objeto.id = maxID + 1;
        id = [...id, objeto.id];
        await fs.promises.writeFile(
          `./proyecto/src${this.idDb}.txt`,
          JSON.stringify(id)
        );

        await fs.promises.writeFile(
          `./proyecto/src/${this.database}.txt`,
          JSON.stringify(objeto)
        );
      } else {
        // Obtengo ID desde un archivo independiente
        let id = JSON.parse(
          await fs.promises.readFile(`./proyecto/src/${this.idDb}.txt`, "utf-8")
        );
        let maxID = Math.max(...id);
        objeto.id = maxID + 1;
        id = [...id, objeto.id];
        await fs.promises.writeFile(
          `./proyecto/src/${this.idDb}.txt`,
          JSON.stringify(id)
        );

        //Obtengo los productos del archivo
        let productos = JSON.parse(
          await fs.promises.readFile(
            `./proyecto/src/${this.database}.txt`,
            "utf-8"
          )
        );

        //Agrego el producto y reescribo el archivo
        productos.push(objeto);

        await fs.promises.writeFile(
          `./proyecto/src/${this.database}.txt`,
          JSON.stringify(productos)
        );

        res.send("Agregado exitosamente");
      }
    } catch (error) {
      console.log("[[[ error en metodo save ]]]", error);
    }
  }

  /* METODO GET BY ID */

  async getById(id) {
    //Obtengo los datos
    let data = JSON.parse(
      await fs.promises.readFile(`./proyecto/src/${this.database}.txt`, "utf-8")
    );

    try {
      let objeto = data.find((prod) => prod.id == id);

      let resultado = objeto ? objeto : { error: "No existe" };
      return resultado;
    } catch (error) {
      console.log("[[[ error en metodo getById ]]]", error);
    }
  }

  /* METODO GETALL */

  async getAll() {
    try {
      let productos = JSON.parse(
        await fs.promises.readFile(
          `./proyecto/src/${this.database}.txt`,
          "utf-8"
        )
      );

      return productos;
    } catch (error) {
      console.log("[[[ error desde metodo getAll ]]]", error);
    }
  }

  /* METODO DELETE BY ID */

  async deleteById(id, res) {
    let data = JSON.parse(
      await fs.promises.readFile(`./proyecto/src/${this.database}.txt`, "utf-8")
    );

    try {
      if (data.some((prod) => prod.id == id)) {
        let newData = data.filter((prod) => prod.id != id);

        await fs.promises.writeFile(
          `./proyecto/src/${this.database}.txt`,
          JSON.stringify(newData)
        );
        res.send("Eliminado con exito");
      } else {
        res.send("no existe  ese id");
      }
    } catch (error) {
      console.log("[[[ error desde metodo deleteById ]]]", error);
    }
  }

  /* METODO DELETE ALL */

  async deleteAll() {
    let archivo = await fs.promises.readFile(
      `./proyecto/src/${this.database}.txt`,
      "utf-8"
    );

    try {
      if (!archivo) {
        console.log("ese archivo no existe");
      } else {
        await fs.promises.writeFile(
          `./proyecto/src/${this.database}.txt`,
          "[]"
        );

        console.log("Todos los archivos han sido eliminados");
      }
    } catch (error) {
      console.log("[[[ error desde metodo deleteAll ]]]", error);
    }
  }

  /* METODO UPDATE */

  async updateProduct(product, id, res) {
    try {
      let data = JSON.parse(
        await fs.promises.readFile(
          `./proyecto/src/${this.database}.txt`,
          "utf-8"
        )
      );
      let index = data.findIndex((x) => x.id == id);

      if (index !== -1) {
        data[index] = product;
        data[index].id = id;

        await fs.promises.writeFile(
          `./proyecto/src/${this.database}.txt`,
          JSON.stringify(data)
        );

        res.send("Producto actualizado");
      } else {
        res.send("Ese id no existe");
      }
    } catch (e) {
      console.log("[[ERROR DESDE METODO PUT]]", e);
    }
  }

  /* METODO searchByCart */
  async searchByCart(id, res) {
    let data = JSON.parse(
      await fs.promises.readFile(`./proyecto/src/${this.database}.txt`, "utf-8")
    );

    try {
      let objeto = data.find((prod) => prod.id == id);

      objeto ? res.send(objeto.products) : res.send("no existe");
    } catch (error) {
      console.log("[[[ error en metodo getById ]]]", error);
    }
  }

  /* METODO AGREGAR PRODUCTO AL CARRITO */

  async addProductToCart(cartID, productID, res) {
    try {
      let data_product = JSON.parse(
        await fs.promises.readFile(`./proyecto/src/productDB.txt`, "utf-8")
      );
      let data_cart = JSON.parse(
        await fs.promises.readFile(
          `./proyecto/src/${this.database}.txt`,
          "utf-8"
        )
      );

      let producto = data_product.filter((prod) => prod.id == productID);
      let cart = data_cart.filter((cart) => cart.id == cartID);
      let index = data_cart.findIndex((x) => x.id == cartID);
      
      data_cart[index].products.push(producto);
      data_cart.push(cart);

      await fs.promises.writeFile(
        `./proyecto/src/${this.database}.txt`,
        JSON.stringify(data_cart)
      );
      res.send("agregado con exito");
    } catch (e) {
      console.log("error desde addProductToCart", e);
    }
  }
}

module.exports = Contenedor