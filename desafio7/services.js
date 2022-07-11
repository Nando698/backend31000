const database = require('./database')

// error.code= ER_TABLE_EXISTS_ERROR


const createProductTable = async () => {
    try {
        
        
        await database.schema.createTable('products', pTable => {
            pTable.increments('id').primary()
            pTable.string('title', 50).notNullable()
            pTable.string('thumbnail', 500).notNullable()
            pTable.integer('price').notNullable()
        })
        console.log('Product table created!')

        database.destroy()
        

    } catch(err) {
        console.log('error code::: ',err.code)
        database.destroy()
    }
}


const createMsjTable = async () => {
    try {
        
        
        await database.schema.createTable('messages', mTable => {
            mTable.increments('id').primary()
            mTable.string('username', 50).notNullable()
            mTable.string('time', 50).notNullable()
            mTable.string('message', 500).notNullable()
        })
        console.log('Mensaje guardado')

        database.destroy()
        

    } catch(err) {
        console.log('error code::: ',err.code)
        database.destroy()
    }
}

module.exports = {createProductTable, createMsjTable}