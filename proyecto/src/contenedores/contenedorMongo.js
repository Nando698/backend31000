import mongoose, { mongo } from "mongoose";

class ContenedorMongo {
  constructor(nombreColeccion, schema) {
    this.collection = mongoose.model(nombreColeccion, schema)
    
  }

  /* METODO SAVE */

  async save(objeto, res) {

  }

  /* METODO GET BY ID */

  async getById(id) {
   
  }

  /* METODO GETALL */

  async getAll() {
   
  }

  /* METODO DELETE BY ID */

  async deleteById(id, res) {
  
  }

  /* METODO DELETE ALL */

  async deleteAll() {
    
  }

  /* METODO UPDATE */

  async updateProduct(product, id, res) {
   
  }

  /* METODO searchByCart */
  async searchByCart(id, res) {
  
  }

  /* METODO AGREGAR PRODUCTO AL CARRITO */

  async addProductToCart(cartID, productID, res) {
 
  }

  /* METODO ELIMINAR UN PRODUCTO POR ID */

  async deleteFromCart(cartID, productID, res) {

  }

/* METODO ADDCART */

async addCart(objeto, res) {
 
        }



}

export default ContenedorMongo