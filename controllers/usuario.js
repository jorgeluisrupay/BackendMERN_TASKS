const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const crearUsuario = async (req, res) => {
       
    try {
        const {nombre,email,password} = req.body;

        //Guardar usuario
        const usuario = new Usuario({nombre,email,password})
        const isExiste = await Usuario.findOne({email})

        if (isExiste) {
            return res.status(400).json({
                msg: 'El usuario ya existe'
             })
        }

        //Hashear el password
        const salt =  bcryptjs.genSaltSync();
        usuario.password =  bcryptjs.hashSync(password,salt);

        //Guardar usuario
        await usuario.save();

        //Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        }
        //Firmar el JWT
        jwt.sign(payload, process.env.SECRETA,{
            expiresIn: '4h'
        },(error, token)=>{
            if (error) throw error;
             //Mensaje de confirmacion 
             res.json({
                msg: 'Usuario creado correctamente',
                nombre,email,password,
                token
            }) 
        });

        //Mensaje de confirmacion
        // res.json({
        //     msg: 'Usuario creado correctamente',
        //     nombre,email,password
        // })

    } catch (error) {
        console.log(error);
        res.status(400).json('Hubo en error')
    }
}

module.exports = {
    crearUsuario
}