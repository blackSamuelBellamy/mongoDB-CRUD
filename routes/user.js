const express = require('express')
const controller = require('../controllers/user.controller')
const { POST, PUT, DELETE } = require('../helpers/check')
const router = express.Router()

router.get('/', controller.userGet)
router.post('/', POST, controller.userPost)
router.put('/:id', PUT, controller.userPut)
router.delete('/:id', DELETE, controller.userDelete)

module.exports = router