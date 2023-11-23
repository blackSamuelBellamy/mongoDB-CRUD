const { Schema, model } = require('mongoose')

const PruductoSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'EL nombre es Obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        require: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        require: true
    },
    descripcion: {type: String},
    disponible: {type: Boolean, default: true}
})

PruductoSchema.methods.toJSON = function() {
    const { __v, estado, ...data } = this.toObject()
    return data
}

module.exports = model('producto', PruductoSchema)