
const { Router } = require('express');
const router = Router();
const productos = require('./productos');
const {routeController} = require('../controllers/routeController')


router.get('/', routeController)
router.use('/productos', productos);




module.exports = router;
