import mongoose from "mongoose";

const mongoConnect = async () => {

    try {
    const URL = 'mongodb://localhost:27017/base'
    await mongoose.connect(URL)
    console.log('Conectado a la base de datos..')
    }catch(e){
        console.log('**', e)
    }
}


mongoConnect()


export {mongoConnect}