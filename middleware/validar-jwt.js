const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const { Usuario } = require('../models')

const validarJWT = async (req = request, res = response, next) => {
    try {
        const token = req.header('x-token')
        if (!token) return res.status(401).json({
            message: 'No estás autorizado'
        })
        const { uid } = jwt.verify(token, process.env.TOKEN_KEY)
        const Admin = await Usuario.findById(uid)

        if(!Admin) return res.status(401).send({
            message: "No existe este usuario - b"
        })

        if(!Admin.estado) return res.status(401).json({
            message: "No existe este usuario"
        })
        req.admin = Admin
        next()
    }
    catch (e) {
        console.log(e)
        res.status(401).json({
            message: "Hubo un error en la validación del token"
        })
    }
}

module.exports = validarJWT