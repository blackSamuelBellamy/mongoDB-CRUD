const { check } = require('express-validator')
const {esRolValido, existeEmail, existeId} = require('./db-validator')
const validar = require('../middleware/validar-campos')

const POST = [
    check('nombre', 'Nombre no debe estar vacío').notEmpty(),
    check('correo', 'No es un correo válido').isEmail(),
    check('correo').custom(existeEmail),
    check('password', 'Contraseña debe tener al menos 6 caracteres').isLength({min: 6}),
    check('rol').custom(esRolValido),
    validar
]

const PUT = [
    check('id', 'El Id no es Válido').isMongoId(),
    check('id').custom(existeId),
    check('rol').custom(esRolValido),
    validar
]

const DELETE = [
    check('id', 'El Id no es Válido').isMongoId(),
    check('id').custom(existeId),
    validar
]


module.exports = {
    POST,
    PUT,
    DELETE
}