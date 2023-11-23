const { request, response } = require('express')
const { Producto } = require('../models')

const controller = {
    getProductos: async (req = request, res = response) => {
        try {
            let { limit = 5, offset = 0 } = req.query

            if (isNaN(Number(limit))) limit = 5
            if (isNaN(Number(offset))) offset = 0

            const productos = await Producto.find({ estado: true })
                .populate('usuario', 'nombre')
                .populate('categoria', 'nombre')
                .limit(Number(limit))
                .skip(Number(offset))

            res.status(200).json({
                total: productos.length,
                productos
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: "Hubo un error en la consulta"
            })
        }
    },
    getProductosId: async (req = request, res = response) => {
        try {
            const { id } = req.params
            const producto = await Producto.findById(id)
                .populate('usuario', 'nombre')
                .populate('categoria', 'nombre')

            if (producto.estado) res.status(200).json({
                producto
            })
            else return res.status(400).json({
                message: "No existe este producto"
            })

        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Hubo un problema con el producto selecccinado'
            })
        }
    },
    postProducto: async (req = request, res = response) => {
        try {
            const { estado, usuario, ...body } = req.body
            const producto = await Producto.findOne({ nombre: body.nombre })

            if (producto) return res.status(400).json({
                message: `EL producto ${producto.nombre} ya existe`
            })

            const data = { 
                ...body,
                nombre: body.nombre.toUpperCase(),
                usuario: req.admin._id 
            }

            const productoDB = new Producto(data)
            await productoDB.save()

            res.status(201).json({productoDB})
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Hubo un problema al grabar el producto'
            })
        }
    },
    putProducto: async (req = request, res = response) => {
        const { id } = req.params
        const { estado, usuario, ... data } = req.body

        data.usuario = req.admin._id
        if(data.nombre) data.nombre = data.nombre.toUpperCase()

        const categoria = await Producto.findByIdAndUpdate(id, data, { new: true})
        res.status(200).json({
            message: 'Producto Actualizado id: ' + id,
            categoria
        })
    },
    deleteProducto: async (req = request, res = response) => {
        const { id } = req.params

        const producto = await Producto.findByIdAndUpdate(id, {estado: false})
        res.status(200).json({
            message: 'producto borrado id: ' + id,
            producto
        })
    }

}

module.exports = controller