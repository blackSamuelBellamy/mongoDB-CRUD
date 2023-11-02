const { response, request } = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')


const controller = {

    userGet: async (req = request, res = response) => {

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
            res.json(e.message)
        }
    },

    userPut: async (req = request, res = response) => {
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
    },

    userDelete: async (req = request, res = response) => {

        const { id } = req.params
        
        const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})

        res.status(200).json({
            message: 'delete API',
            usuario
        })
    },
}

module.exports = controller