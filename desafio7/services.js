const dblite = require('./database')
const dbconnection = require('./database')




const createProductTable = async () => {
    try {
        
        
        await dbconnection.schema.createTable('products', pTable => {
            pTable.increments('id').primary()
            pTable.string('title', 50).notNullable()
            pTable.string('thumbnail', 500).notNullable()
            pTable.integer('price').notNullable()
        })
        console.log('Product table created!')

        dbconnection.destroy()
        

    } catch(err) {
        console.log('error code::: ',err.code)
        dbconnection.destroy()
    }
}


const createMsjTable = async () => {
    try {
        
        
        await dblite.schema.createTable('messages', mTable => {
            mTable.increments('id').primary()
            mTable.string('username', 50).notNullable()
            mTable.string('time', 50).notNullable()
            mTable.string('message', 500).notNullable()
        })
        console.log('Mensaje guardado')

        dblite.destroy()
        

    } catch(err) {
        console.log('error code::: ',err.code)
        dblite.destroy()
    }
}

const deleteTable = async table => {
    try{

        dblite.schema.dropTable(table)

    }catch(e){
        console.log('desde delete', e)
    }
}



module.exports = {createProductTable, createMsjTable}