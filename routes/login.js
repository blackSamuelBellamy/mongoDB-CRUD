const express = require('express')
const router = express.Router()
const controller = require('../controllers/login.controller')
const { POST_LOGIN } = require('../helpers/check')

router.post('/login', POST_LOGIN, controller.loginPost)

module.exports = router