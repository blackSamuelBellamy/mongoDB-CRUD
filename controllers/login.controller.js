const { request, response } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')
const generarJWT = require('../helpers/jwt')

const controller = {

    loginPost: async (req = request, res = response) => {
        try {
            const { correo, password } = req.body
            const usuario = await Usuario.findOne({ correo })
            if (!usuario) {
                return res.status(400).json({
                    message: "No existe correo"
                })
            }
            if (!usuario.estado) {
                return res.status(400).json({
                    message: "No existe Usuario"
                })
            }

            const passwordCorrecta = bcryptjs.compareSync(password, usuario.password)
            if (!passwordCorrecta) {
                return res.status(400).json({
                    message: "Password incorrecta"
                })
            }

            const token = await generarJWT(usuario.id)   
    
    
            res.json({
            usuario,
            token
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: "hubo un error"
            })
        }
    }
}

module.exports = controller