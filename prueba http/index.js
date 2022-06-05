const http = require('http')
const puerto = 8080

const date = new Date().getHours()

const server = http.createServer((req, res) => {
    res.end(date > 5 && date < 13 ? "Buenos dias!" : date > 12 && date < 20 ? 'Buenas tardes!' : 'Buenas noches!')
})


server.listen(puerto, () => {
    console.log(`servidor escuchando puerto ${puerto}`)
})