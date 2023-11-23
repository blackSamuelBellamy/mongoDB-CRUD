const { request, response } = require('express')
const { Usuario, Categoria, Producto } = require('../models')
const { ObjectId } = require('mongoose').Types

const colecciones = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
]

const usuarios = async (termino = '', res = response) => {
    try {
        const esMongoId = ObjectId.isValid(termino)
        if (esMongoId) {
            const usuario = await Usuario.find({ _id: termino, estado: true })
            return res.status(200).json({
                results: usuario ? [usuario] : []
            })
        }
        const regex = new RegExp(termino, 'i')
        const usuario = await Usuario.find({ nombre: regex, estado: true })
        res.status(200).json({
            results: usuario ? [usuario] : []
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Ha ocurrido un error'
        })
    }
}

const categorias = async (termino = '', res = response) => {
    try {
        const esMongoId = ObjectId.isValid(termino)
        if (esMongoId) {
            const categoria = await Categoria.find({ _id: termino, estado: true })
            return res.status(200).json({
                results: categoria ? [categoria] : []
            })
        }
        const regex = new RegExp(termino, 'i')
        const categoria = await Categoria.find({ nombre: regex, estado: true })
        res.status(200).json({
            results: categoria ? [categoria] : []
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Ha ocurrido un error'
        })
    }
}

const productos = async (termino = '', res = response) => {
    try {
        const esMongoId = ObjectId.isValid(termino)
        if (esMongoId) {
            const producto = await Producto.find({ _id: termino, estado: true })
            return res.status(200).json({
                results: producto ? [producto] : []
            })
        }
        const regex = new RegExp(termino, 'i')
        const producto = await Producto.find({ nombre: regex, estado: true })
        res.status(200).json({
            results: producto ? [producto] : []
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Ha ocurrido un error'
        })
    }
}


const buscar = async (req = request, res = response) => {
    const { coleccion, termino } = req.params
    if (!colecciones.includes(coleccion))
        return res.status(404).json({
            message: 'No existe coleccion: ' + coleccion
        })


    switch (coleccion) {
        case 'usuarios':
            await usuarios(termino, res)
            break
        case 'categoria':
            productos(termino, res)
            break
        case 'productos':
            await productos(termino, res)
            break
        default:
            res.json({
                message: 'Buscar...'
            })
            break
    }


}

module.exports = buscar