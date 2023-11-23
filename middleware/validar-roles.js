const { response, request } = require("express")


const validarRole = (...roles) => {
    return (req = request, res = response, next) => {

        if(!req.admin) return res.status(500).json({
            message: "No se ha validado el token"
        })
        
        if(!roles.includes(req.admin.rol)) return res.status(401).json({
            message: `Se necesita uno de estos roles para la función ${roles}`
        })
        next()
    }
}


const validarRoleAdmin = async (req, res = response, next) => {
    if(!req.admin) return res.status(500).json({
        message: "No se ha validado el token"
    })
    const { rol, nombre } = req.admin
   
    if(rol !== 'ADMIN_ROLE') return res.status(401).json({
        message: nombre + " No estás autorizado para hacer esta acción"
    })

    next()
}

module.exports = {
    validarRole,
    validarRoleAdmin
}