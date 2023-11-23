const express = require('express')
const controller = require('../controllers/login.controller')
const { POST_LOGIN, POST_LOGIN_GOOGLE } = require('../helpers/checks')
const router = express.Router()

router.post('/login', POST_LOGIN, controller.loginPost)
router.post('/google', POST_LOGIN_GOOGLE, controller.loginPostGoogle)

module.exports = router