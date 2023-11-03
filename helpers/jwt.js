const jwt = require('jsonwebtoken')


const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid }
        jwt.sign(payload, process.env.TOKEN_KEY, {
            expiresIn: '15m'
        }, 
        (err, token) => {
            if(err){
                console.log(err)
                reject('No se puedo generar Token')
            } else {
                resolve(token)
            } 
        })
    })
}

module.exports = generarJWT