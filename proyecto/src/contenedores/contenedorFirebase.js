import dotenv from "dotenv";
dotenv.config();

import database from '../config/firebase.js'
import { doc, getDoc, getDocs ,collection } from "firebase/firestore";

class ContenedorFirebase {
  constructor(collection) {
    this.database = database.collection(collection);
    
  }

  /* METODO SAVE */

  async save(objeto, res) {

  }

  /* METODO GET BY ID */

  async getById(id) {
   
  }

  /* METODO GETALL */

  async getAll() {
    console.log('asdasdasdas')
/*     const iCollection = collection(database,this.database)
    const productsSnap = await getDocs(iCollection)
    const productList = productsSnap.docs.map((doc) => {
      let product = doc.data()
      product.id = doc.id

      return product
    })

    return productList */
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
    try{
  
      const orderFirebase = collection(database, "products");
      await addDoc(orderFirebase, objeto);
  
      res.send('Agregado')
  
  
    }catch(e){
      console.log('Error....', e)
    }
  
          }


}

export default ContenedorFirebase