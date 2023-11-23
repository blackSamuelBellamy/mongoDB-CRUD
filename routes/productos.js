const express = require('express')
const controller = require('../controllers/productos.controller')
const { 
    POST_PRODUCTO, 
    GET_PRODUCTO_ID, 
    PUT_PRODUCTO, 
    DELETE_PRODUCTO 
} = require('../helpers/checks/index')
const router = express.Router()

router.get('/', controller.getProductos)
router.get('/:id', GET_PRODUCTO_ID, controller.getProductosId )
router.post('/', POST_PRODUCTO, controller.postProducto)
router.put('/:id', PUT_PRODUCTO, controller.putProducto)
router.delete('/:id', DELETE_PRODUCTO, controller.deleteProducto) 

module.exports = router