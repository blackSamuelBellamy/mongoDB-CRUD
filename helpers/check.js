const { check } = require('express-validator')
const {esRolValido, existeEmail, existeId} = require('./db-validator')
const {
    validarCampos, 
    validarJWT, 
    validarRole, 
    validarRoleAdmin
} = require('../middleware')


const POST_USER = [
    check('nombre', 'Nombre no debe estar vacío').notEmpty(),
    check('correo', 'No es un correo válido').isEmail(),
    check('correo').custom(existeEmail),
    check('password', 'Contraseña debe tener al menos 6 caracteres').isLength({min: 6}),
    check('rol').custom(esRolValido),
    validarCampos
]

const POST_LOGIN = [
    check('correo', 'Correo no debe estar vacío').notEmpty(),
    check('correo', 'No es un correo válido').isEmail(),
    check('password', 'Contraseña es obligatoria').notEmpty(),
    validarCampos
]

const POST_LOGIN_GOOGLE = [
    check('id_token', 'id_token es necesario').notEmpty(),
    validarCampos
]

const PUT = [
    check('id', 'El Id no es Válido').isMongoId(),
    check('id').custom(existeId),
    check('rol').custom(esRolValido),
    validarCampos
]

const DELETE = [
    validarJWT,
    validarRole('ADMIN_ROLE', 'USER_ROLE'),
    validarRoleAdmin,
    check('id', 'El Id no es Válido').isMongoId(),
    check('id').custom(existeId),
    validarCampos
]


module.exports = {
    POST_USER,
    POST_LOGIN,
    POST_LOGIN_GOOGLE,
    PUT,
    DELETE
}