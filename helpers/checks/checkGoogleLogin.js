const { check } = require('express-validator')
const { validarCampos  } = require('../../middleware')

const POST_LOGIN_GOOGLE = [
    check('id_token', 'id_token es necesario').notEmpty(),
    validarCampos
]

module.exports = POST_LOGIN_GOOGLE