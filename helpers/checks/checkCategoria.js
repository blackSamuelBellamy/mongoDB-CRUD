const { check } = require('express-validator')
const { existeCategoriaId, } = require('../db-validator')
const {
    validarCampos,
    validarJWT,
    validarRole,
    validarRoleAdmin
} = require('../../middleware')

const GET_CATEGORIA_ID = [
    check('id', 'El Id no es Válido').isMongoId(),
    check('id').custom(existeCategoriaId)
]

const POST_CATEGORIAS = [
    validarJWT,
    check('nombre', 'Nombre es obligatorio').notEmpty(),
    validarCampos
]

const PUT_CATEGORIAS = [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('id').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos
]

const DELETE_CATEGORIAS = [
    validarJWT,
    validarRole('ADMIN_ROLE', 'USER_ROLE'),
    validarRoleAdmin,
    check('id', 'El Id no es Válido').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos
]

module.exports = {
    GET_CATEGORIA_ID,
    POST_CATEGORIAS,
    PUT_CATEGORIAS,
    DELETE_CATEGORIAS
}