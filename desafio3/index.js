const express = require('express')
const fs = require('fs')
const app = express()
const port = 8080


const productos = [
  {
  "title": "Escuadra",
  "price": 123.45,
  "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
  "id": 1
  },
  {
  "title": "Calculadora",
  "price": 234.56,
  "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
  "id": 2
  },
  {
  "title": "Globo Terráqueo",
  "price": 345.67,
  "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
  "id": 3
  }
 ]


class Contenedor {
    constructor(archivo) {
      this.archivo = archivo;
    }

    async getAll() {
        try {
          return JSON.parse(
            await fs.promises.readFile(`./desafio3/${this.archivo}`, "utf-8")
          );
        } catch (error) {
          console.log("[[[ error desde metodo getAll ]]]", error);
        }
      }


}



app.listen(port, () => {
    try {
    console.log(`Servidor iniciado en puerto ${port}`)
    }catch(err) {
        console.log('ojota!!!',err)
    }
})


app.get('/', (req, res) => {
    res.send(

       ` <h1 style="color: blue" >Bienvenido al servidor de NANDO</h1> `

    )
} )


app.get('/api/productos', async (req, res) => {
    
    let productos = await new Contenedor('productos.txt').getAll()
    
    res.send( `<h1>PRODUCTOS</h1> <ul  style="list-style: none" > ${productos.map(prod => {

        let card = `<li><img src='${prod.thumbnail}' style="width: 30px" />${prod.title}, <br> Precio:$ ${prod.price}</li>`
       
       
        return card


    })}</ul>` )
} )





app.get('/productoRandom', async (req, res) => {
    
    let productos = await new Contenedor('productos.txt').getAll()

    let random =Math.floor( Math.random() * productos.length);
    
    res.send(

        `<img src='${productos[random].thumbnail}' style="width: 100px" /><br>${productos[random].title}, <br> Precio:$ ${productos[random].price}`

    )
} )




