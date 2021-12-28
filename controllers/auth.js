const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authUsuario = async(req, res) => {
    //extraer el email y password
    const {email, password} = req.body;
    try {
        //Revisar si es un usuario Registrado
        let usuario = await Usuario.findOne({email});
        if (!usuario) {
            return res.status(400).json({msg: 'El usuario no existe'})
        }
        //Revisar el password
        const passCorrecto = bcryptjs.compareSync(password,usuario.password)
        if (!passCorrecto) {
            return res.status(400).json({msg: 'Password Incorrecto'})
        }
        //Si todo es correcto crear y firmar el jwt 
        const payload = {
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre
            }
        }
        //Firmar el JWT
        jwt.sign(payload, process.env.SECRETA,{
            expiresIn: '4h'
        },(error, token)=>{
            if (error) throw error;
             //Mensaje de confirmacion 
             res.json({
                msg: 'Usuario auth correctamente',
                email,
                token
            }) 
        });

        
    } catch (error) {
        console.log(error);
    }
}

const usuarioAutenticado = async (req, res) => {

    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({
            usuario
         })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un Error'
        });
    }

}

module.exports = {
    authUsuario,
    usuarioAutenticado,
}