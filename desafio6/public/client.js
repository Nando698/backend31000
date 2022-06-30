// Socket
const socket = io()


// DOM
const productForm = document.querySelector('#productForm')
const titleInput = document.querySelector('#title')
const priceInput = document.querySelector('#price')
const imgInput = document.querySelector('#img')
const productPool = document.querySelector('#productPool')
const formMsj = document.querySelector('#formMsj')
const msgPool = document.querySelector('#msgPool')
const mailInput = document.querySelector('#mailInput')
const msjInput = document.querySelector('#msjInput')
const btnSend = document.querySelector('#sendInput')


// PRODUCTOS
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
// FIN PRODUCTOS


// CHAT

function sendMsg (msgInfo) {
    socket.emit('client:msg', msgInfo);
}
function renderMsgs (msgsInfo) {
    const html = msgsInfo.map(msgInfo => {
        return(`<div>
        <span class="msgsPool-user">${msgInfo.username}</span>
        [<span class="msgsPool-date">${msgInfo.time}<span>]: 
        <span class="msgsPool-msg">${msgInfo.message}</span>
        </div>`)
    }).join(" ");
    msgPool.innerHTML = html;
}
function submitHandlerMsg (event) {
    event.preventDefault();
    const timeStamp = new Date();
    const fechayhora = timeStamp.toLocaleDateString()
    const msgInfo = { username: mailInput.value, time: fechayhora, message: msjInput.value };
    sendMsg(msgInfo);
}

btnSend.addEventListener('click', submitHandlerMsg);

socket.on('server:msgs', arrayMsj => {
    renderMsgs(arrayMsj)
});

// FIN CHAT






socket.on('server:products', products => {
    renderProducts(products)
    console.log(products)
    
    
})

socket.on("server:product", producto => {
    renderProduct(producto);
})
