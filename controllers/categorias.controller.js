const { request, response } = require('express')
const { Categoria } = require('../models')

const controller = {
    
    getCategorias: async (req = request, res = response) => {
        const { limit = 5, offset = 0 } = req.query
        const query = { estado: true}
        const [categorias] = await Promise.all([
            Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(offset))
            .limit(Number(limit))
        ])
        res.status(200).json({
            total: categorias.length,
            categorias
        })
    },

    getCategoriasId: async (req = request, res = response) => {
        const { id } = req.params
        const categoria = await Categoria.findById(id).populate('usuario', 'nombre')
        res.status(200).json({
            categoria
        })
    },

    postCategorias: async (req = request, res = response) => {
        try {
            const nombre = req.body.nombre.toUpperCase()
            const categoria = await Categoria.findOne({ nombre })

            if (categoria) return res.status(400).json({
                message: `La categoria ${categoria.nombre} ya existe`
            })
            console.log(req)
            const data = {
                nombre
            }

            const categoriaDB = new Categoria(data)
            await categoriaDB.save()
           
            res.status(201).json({
                message: 'Nueva categoria',
                usuario: req.admin._id
            })
        } catch(e) {
            console.log(e)
            res.status(500).json({
                message: 'Hubo un problema al grabar la categoría'
            })
        }
    },

    putCategoria: async (req = request, res = response) => {
        const { id } = req.params
        const { estado, usuario, ... data } = req.body
        
        data.nombre = data.nombre.toUpperCase()

        const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true})
        res.status(200).json({
            message: 'Actualizada Categoría id: ' + id,
            categoria
        })
    },

    deleteCategoria: async (req = request, res = response) => {
        const { id } = req.params

        const categoria = await Categoria.findByIdAndUpdate(id, {estado: false})
        res.status(200).json({
            message: 'Categoria borrada id: ' + id,
            categoria
        })
    }
}

module.exports = controller