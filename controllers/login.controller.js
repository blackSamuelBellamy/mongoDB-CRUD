const { request, response } = require('express')
const { Usuario } = require('../models')
const bcryptjs = require('bcryptjs')
const generarJWT = require('../helpers/jwt')
const googleVerify = require('../helpers/google-verify')

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
    },
    loginPostGoogle: async (req = request, res = response) => {
        try {
            const { id_token } = req.body
            const { nombre, correo, img } = await googleVerify(id_token)
            let usuario = await Usuario.findOne({ correo })

            if (!usuario) {
                const data = {
                    nombre,
                    correo,
                    img,
                    rol: 'USER_ROLE',
                    password: 'nuewOne',
                    google: true
                }
                const usuario = new Usuario(data)
                await usuario.save()
            }

            if(!usuario.estado) {
                return res.status(401).json({
                    messsage: 'Hable con el administrador'
                })
            }

            const token = await generarJWT(usuario.id)

            res.json({
                message: 'Todo ok',
                usuario,
                token
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({
                message: "hubo un error en la autenticación"
    
            })
        }
    }
}

module.exports = controller