const express = require('express')
const controller = require('../controllers/categorias.controller')
const { 
    GET_CATEGORIA_ID, 
    POST_CATEGORIAS, 
    PUT_CATEGORIAS, 
    DELETE_CATEGORIAS
} = require('../helpers/checks')
const router = express.Router()


router.get('/', controller.getCategorias)
router.get('/:id', GET_CATEGORIA_ID, controller.getCategoriasId)
router.post('/', POST_CATEGORIAS, controller.postCategorias)
router.put('/:id', PUT_CATEGORIAS ,controller.putCategoria)
router.delete('/:id',DELETE_CATEGORIAS, controller.deleteCategoria)

module.exports = router
