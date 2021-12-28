const {validationResult} = require('express-validator');

const validarCampos = (req, res, next) => {
    //revidar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ 
            errores: errores.array()
        })
    }
    next();
}

module.exports = {
    validarCampos
}