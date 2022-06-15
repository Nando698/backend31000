const { Router } = require('express')
const { append } = require('express/lib/response')
const router = Router()

append.use('/gatitos', express.static('public'))

router.get('/home', (req, res) => {
    res.send('estas en home')
})

module.exports = router