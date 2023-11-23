const {Rol, Usuario, Categoria} = require('../models')


const existeId = async (id) => {
    const user = await Usuario.findById(id)
    if(!user) throw new Error(`No existe el id: ${id}`)
}


const esRolValido = async (rol = '') => {
    const existeRol = await Rol.findOne({ rol })
    if (!existeRol) throw new Error(`EL rol ${rol} no está registrado en la base de datos.`)
}

const existeEmail = async ( correo = '') => {
    const correoExistente = await Usuario.findOne({ correo })        
    if(correoExistente) throw new Error('Este correo ya existe')
}

const existeCategoriaId = async (id = '') => {
    const categoria = await Categoria.findById(id)
    if(!categoria) throw new Error('No existe id ' + id)
}

const existeProductoId = async (id = '') => {
    const producto = await Producto.findById(id)
    if(!producto) throw new Error('No existe id' + id)
}

module.exports = {
    existeId,
    esRolValido,
    existeEmail,
    existeCategoriaId,
    existeProductoId
}