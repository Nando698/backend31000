import * as fs from 'fs';

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
      let data = JSON.parse(
        await fs.promises.readFile(
          `./proyecto/src/${this.database}.txt`,
          "utf-8"
        )
      );

      return data;
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
    try {
      let data = JSON.parse(
        await fs.promises.readFile(
          `./proyecto/src/${this.database}.txt`,
          "utf-8"
        )
      );



      let objeto = data.find((prod) => prod.id == id);

      objeto !== undefined ? res.send(objeto.products) : res.send("no existe");
    } catch (e) {
      console.log("error leyendo base de datos", e);
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

      
      let producto = data_product[data_product.findIndex(x => x.id == productID)]
      
      let cart = data_cart[data_cart.findIndex(x => x.id == cartID)]
      

      cart.products.push(producto);
      
      data_cart = data_cart.filter( x => x.id !== cart.id)
          console.log('data_cart', data_cart)
      data_cart.push(cart);
      console.log('data_cart + objeto', data_cart)

      await fs.promises.writeFile(
        `./proyecto/src/${this.database}.txt`,
        JSON.stringify(data_cart)
      );
      res.send("agregado con exito");
    } catch (e) {
      console.log("error desde addProductToCart", e);
    }
  }

  /* METODO ELIMINAR UN PRODUCTO POR ID */

  async deleteFromCart(cartID, productID, res) {
    try {
      let data_cart = JSON.parse(
        await fs.promises.readFile(
          `./proyecto/src/${this.database}.txt`,
          "utf-8"
        )
      );

      let cart = data_cart[data_cart.findIndex(x => x.id == cartID)]

      cart.products.splice(cart.products.findIndex(x => x.id == productID), 1)

      data_cart = data_cart.filter((c) => c.id !== cart.id);

      data_cart.push(cart);

      await fs.promises.writeFile(
        `./proyecto/src/${this.database}.txt`,
        JSON.stringify(data_cart)
      );

      res.send(
        `El producto con id ${productID} ha sido eliminado del carrito nro ${cartID}`
      );
    } catch (e) {
      console.log("error desde metodo eliminar", e);
    }
  }

/* METODO ADDCART */

async addCart(objeto, res) {
  let data = JSON.parse(
    await fs.promises.readFile(`./proyecto/src/${this.database}.txt`, "utf-8")
  );

  try {
 
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

              objeto.products = []
      
              //Agrego el producto y reescribo el archivo
              productos.push(objeto);
      
              await fs.promises.writeFile(
                `./proyecto/src/${this.database}.txt`,
                JSON.stringify(productos)
              );
      
              res.send("Agregado exitosamente");
            
          } catch (error) {
            console.log("[[[ error en metodo save ]]]", error);
          }
        }



}

export default Contenedor
