const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {

    #PUERTO = process.env.PUERTO
    #router = require('../routes/user')
    #paths = '/api/users'

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
        this.app.use(this.#paths, this.#router)
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