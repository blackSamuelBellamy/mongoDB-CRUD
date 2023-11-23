const { response, request } = require('express')
const { Usuario } = require('../models')
const bcrypt = require('bcryptjs')


const controller = {

    userGet: async (req = request, res = response) => {
        try {
            let { limit = 10, offset = 0 } = req.query

            if (isNaN(Number(limit))) limit = 10
            if (isNaN(Number(offset))) offset = 0

            const query = { estado: true }

            const [nombres] = await Promise.all([
                Usuario.find(query)
                    .limit(Number(limit))
                    .skip(Number(offset))
            ])

            res.status(200).json({
                total: nombres.length,
                nombres
            })

        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Hubo un problema'
            })
        }

    },

    userPost: async (req = request, res = response) => {
        try {
            const { nombre, correo, password, rol } = req.body
            const salt = bcrypt.genSaltSync()
            const usuario = new Usuario({ nombre, correo, password, rol })
            usuario.password = bcrypt.hashSync(password, salt)
            await usuario.save()
            res.status(201).json(usuario)
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: "Hubo un error"
            })
        }
    },

    userPut: async (req = request, res = response) => {
        try {
            const { id } = req.params
            const { _id, password, google, correo, ...rest } = req.body

            if (password) {
                const salt = bcrypt.genSaltSync()
                rest.password = bcrypt.hashSync(password, salt)
            }

            const usuario = await Usuario.findByIdAndUpdate(id, rest)
            res.status(200).json({
                message: 'put API',
                usuario
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: "Hubo un error"
            })
        }
    },

    userDelete: async (req = request, res = response) => {
        try {
            const { id } = req.params
            const usuario = await Promise.all([
                Usuario.findByIdAndUpdate(id, { estado: false }),
            ])

            res.status(200).json({
                message: 'delete API',
                usuario
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