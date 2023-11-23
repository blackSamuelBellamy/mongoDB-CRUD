const { check } = require('express-validator')
const { existeProductoId, existeCategoriaId } = require('../db-validator')
const { 
    validarCampos, 
    validarJWT, 
    validarRole, 
    validarRoleAdmin 
} = require('../../middleware')


const GET_PRODUCTO_ID = [
    check('id').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
]

const POST_PRODUCTO = [
    validarJWT,
    check('nombre', 'El nombre no debe estar vacío').notEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria', 'No existe esa categoria').custom(existeCategoriaId),
    validarCampos
]

const PUT_PRODUCTO = [
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
]

const DELETE_PRODUCTO = [
    validarJWT,
    validarRole,
    validarRoleAdmin,
    check('id', 'No es un id válido de mongo').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
]

module.exports = {
    GET_PRODUCTO_ID,
    POST_PRODUCTO,
    PUT_PRODUCTO,
    DELETE_PRODUCTO
}