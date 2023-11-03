const express = require('express')
const controller = require('../controllers/user.controller')
const { POST_USER, PUT, DELETE } = require('../helpers/check')
const router = express.Router()

router.get('/', controller.userGet)
router.post('/', POST_USER, controller.userPost)
router.put('/:id', PUT, controller.userPut)
router.delete('/:id', DELETE, controller.userDelete)

module.exports = router