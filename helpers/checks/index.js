const categoria = require('./checkCategoria')
const POST_LOGIN_GOOGLE= require('./checkGoogleLogin')
const POST_LOGIN= require('./checkLogin')
const producto = require('./checkProducto')
const usuario = require('./checkUsuario')


module.exports = {
   ...categoria,
   ...producto,
   ...usuario,
   POST_LOGIN_GOOGLE,
   POST_LOGIN
}