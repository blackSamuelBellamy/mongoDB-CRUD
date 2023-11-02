const Rol = require('../models/role')
const Usuario = require('../models/usuario')

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

module.exports = {
    existeId,
    esRolValido,
    existeEmail
}