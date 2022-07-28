import dotenv from "dotenv";
dotenv.config();

import database from '../config/firebase.js'
import { doc, getDoc, getDocs ,collection, deleteDoc, updateDoc, addDoc} from "firebase/firestore";

class ContenedorFirebase {
  constructor(collection) {
    this.col = collection
    this.elemento = this.col == 'products' ? 'Pooducto' : 'Carrito'
  }

  /* METODO GET BY ID */

  async getById(id) {
    
    const docRef = doc(database, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      return 'No existe'
    }
  }

  /* METODO GETALL */

  async getAll() {
    
    const iCollection = collection(database,this.col)
    const productsSnap = await getDocs(iCollection)
    const productList =  productsSnap.docs.map((doc) => {
      let product = doc.data()
      product.id = doc.id

      return product
    })

    return productList
  }

  
  
  /* METODO DELETE BY ID */

  async deleteById(id) {

    const docRef = doc(database, this.col, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) { 

    await deleteDoc(doc(database, this.col, id))
  
    return `${this.elemento} con id ${id}, eliminado`
    }else{
      return 'Producto inexistente'
    }
  }

  /* METODO UPDATE */

  async update(id, product) {

    const docRef = doc(database, this.col, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
   
      const docRef = doc(database, this.col, id);
      updateDoc(docRef, product)

    return `Producto con id ${id} actualizado`


    }else{
      return 'Ese producto no existe'
    }
  }

  
  /* METODO ADD */
  
  async add(objeto) {
    try{
  
      const orderFirebase = collection(database, this.col);
      await addDoc(orderFirebase, objeto);
  
      return 'Producto agregado'
  
  
    }catch(e){
      console.log('Error....', e)
    }
  
          }


}

export default ContenedorFirebase