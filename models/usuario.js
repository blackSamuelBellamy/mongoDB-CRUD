const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Debe ingresar un nombre']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'la contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id: uid, ...usuario} = this.toObject()
    return {uid, ...usuario}
}

module.exports = model('Usuario', UsuarioSchema) 