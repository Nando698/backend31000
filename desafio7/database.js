const knex = require('knex')
const path = require('path')

const conf = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "proyectobackend",
  },
  pool: { min: 0, max: 7 },
}


const confSQLITE = {
  client: "sqlite3",
  connection: { filename: path.join(__dirname, './DB/msj.db')  },
  useNullAsDefault: true
}




const dbconnection = knex(conf)
const dblite = knex(confSQLITE)

module.exports = {dbconnection, dblite}