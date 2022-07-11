const dbconnection = require('./database')



const getAll = async ()=> {
    const productsFromDB = await dbconnection.from("products").select("*");
    productsFromDB.forEach((P) => console.log(P));
    console.log(productsFromDB)
    dbconnection.destroy();
    return productsFromDB;
  }

  getAll()