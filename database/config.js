const mongoose= require('mongoose')

const dbConnection = async () => {
    try {     
        await mongoose.connect(process.env.MONGODB_CNN)
        console.log('We are Online')
    } catch(e) {
        throw new Error('Error al inicializar la base datos')
    }

}

module.exports = {
    dbConnection
}