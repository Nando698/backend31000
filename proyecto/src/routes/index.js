const { Router } = require('express');
const router = Router();
const productos = require('./productRoutes')
const cart = require('./cartRoutes')



router.get('/', (req, res) => {
    res.send('desde api')
})

router.use('/productos', productos)

router.use('/cart', cart);


module.exports = router;