const { check } = require('express-validator')
const { validarCampos  } = require('../../middleware')

const POST_LOGIN = [
    check('correo', 'Correo no debe estar vacío').notEmpty(),
    check('correo', 'No es un correo válido').isEmail(),
    check('password', 'Contraseña es obligatoria').notEmpty(),
    validarCampos
]

module.exports = POST_LOGIN