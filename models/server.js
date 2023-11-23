const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {

    #PUERTO = process.env.PUERTO
    #buscarPath = '/api/buscar'
    #categoriasPath = '/api/categorias'
    #loginPath = '/api/auth'
    #productoPath = '/api/productos'
    #userPath = '/api/users'
    
    #buscarRouter = require('../routes/buscar')
    #categoriasRouter = require('../routes/categorias')
    #loginRouter = require('../routes/login')
    #productoRouter = require('../routes/productos')
    #userRouter = require('../routes/user')


    constructor() {
        this.app = express()
        this.database()
        this.middlewares()
        this.routes()
    }

    async database() {
        await dbConnection()
    }

    routes() {
        this.app.use(this.#buscarPath, this.#buscarRouter)
        this.app.use(this.#categoriasPath, this.#categoriasRouter)
        this.app.use(this.#loginPath, this.#loginRouter)
        this.app.use(this.#productoPath, this.#productoRouter)
        this.app.use(this.#userPath, this.#userRouter)
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    listen() {
        this.app.listen(this.#PUERTO,
        console.log(`PUERTO LEVANTADO EN: ${this.#PUERTO}`))
    }
}

module.exports = Server