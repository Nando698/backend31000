import mongoose from "mongoose";
import {mongoConnect} from '../config/mongooseCFG.js'

mongoConnect()

class ContenedorMongo {
  constructor(nombreColeccion, schema) {
    this.collection = mongoose.model(nombreColeccion, schema)
    
  }

  /* METODO GET BY ID */

  async getById(id) {
    
    
    try{
    const doc = await this.collection.findById(id, { __v: 0 });
    return doc;
    }catch(e){
      return 'no se ha podido encontrar'
    }
  }

  /* METODO GETALL */

  async getAll() {
    const docs = await this.collection.find({}, { __v: 0 });
    return docs;
  }

  /* METODO DELETE BY ID */

  async deleteById(id) {
    try{

      await this.collection.deleteOne({'_id': id })
        
      return 'Producto eliminado'
      }catch(e){
        console.log('No se ha podido eliminar', e);
      }
  }


  /* METODO UPDATE */

  async update(id, product) {
    
    
    try{

    await this.collection.updateOne({'_id': id }, product)
      
    return 'Producto actualizado'
    }catch(e){
      console.log('No se ha podido actualizar', e);
    }
  }

/* METODO ADD */

async add(objeto) {
  try {
  objeto.timestamp = new Date().toLocaleString("fr-FR");
    const nuevoElemento = new this.collection(objeto);
    let nuevoElementoGuardado = await nuevoElemento.save();
    return nuevoElementoGuardado;
  }catch(e){
    return 'los datos no son correctos';
  }
  
  
  
  }



}

export default ContenedorMongo