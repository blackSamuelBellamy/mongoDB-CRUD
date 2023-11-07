const express = require('express')
const router = express.Router()
const controller = require('../controllers/login.controller')
const { 
    POST_LOGIN, 
    POST_LOGIN_GOOGLE 
} = require('../helpers/check')

router.post('/login', POST_LOGIN, controller.loginPost)
router.post('/google', POST_LOGIN_GOOGLE, controller.loginPostGoogle)

module.exports = router