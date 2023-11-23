const express = require('express')
const controller = require('../controllers/user.controller')
const { POST_USUARIO, PUT_USUARIO, DELETE_USUARIO } = require('../helpers/checks')
const router = express.Router()

router.get('/', controller.userGet)
router.post('/', POST_USUARIO, controller.userPost)
router.put('/:id', PUT_USUARIO, controller.userPut)
router.delete('/:id', DELETE_USUARIO, controller.userDelete)

module.exports = router