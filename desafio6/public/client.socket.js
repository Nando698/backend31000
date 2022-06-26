const socket = io()

async function renderProducts(products) {

    const response = await fetch('./plantilla1.hbs')
    const plantilla = await response.text()
    
    console.log('asd')
    products.forEach(product => {
        const template = Handlebars.compile(plantilla)
        const html = template({product})
        document.querySelector('#productos').innerHTML += html
    })
}

socket.on('server:products', products => {
    console.log('asd',products)
    renderProducts(products)
    
})