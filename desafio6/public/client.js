const socket = io()
const productForm = document.querySelector('#productForm')
const titleInput = document.querySelector('#title')
const priceInput = document.querySelector('#price')
const imgInput = document.querySelector('#img')
const productPool = document.querySelector('#productPool')


function sendProduct(product) {
    socket.emit('client:product', product)
}

function submitHandler (e) {
    e.preventDefault()
    
    const product = { title: titleInput.value, price: priceInput.value , thumbnail: imgInput.value}

    sendProduct(product)
}


async function renderProducts(products) {

    const response = await fetch('./plantilla1.hbs')
    const plantilla = await response.text()
    
    
    products.forEach(product => {
        const template = Handlebars.compile(plantilla)
        const html = template(product)
        productPool.innerHTML += html
    })
}

async function renderProduct(producto) {

    const response = await fetch('./plantilla1.hbs')
    const plantilla = await response.text()
        
    const template = Handlebars.compile(plantilla)
    const html = template(producto)
    productPool.innerHTML += html
    
}


productForm.addEventListener('submit', submitHandler)

socket.on('server:products', products => {
    renderProducts(products)
    console.log(products)
    
    
})

socket.on("server:product", producto => {
    renderProduct(producto);
})
