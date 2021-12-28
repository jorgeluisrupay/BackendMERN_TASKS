const jwt = require('jsonwebtoken');

const ValidarUsuario = (req, res, next) => {
    //Leer el token del header
    const token = req.header('x-token')

    //Revisar si no hay token 
    if (!token) {
    return res.status(401).json({
        msg: 'No hay token, permiso no valido'
    })
    }
    //Validar Token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();
        
    } catch (error) {
        res.status(401).json({
            msg:'Token no valido'
        })
    }

}

module.exports = {
    ValidarUsuario
}