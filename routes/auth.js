//Rutas para autenticar usuarios
const express = require('express');

const router = express.Router();
const { check } = require('express-validator');
const { authUsuario, usuarioAutenticado } = require('../controllers/auth');
const { ValidarUsuario } = require('../middlewares/auth');
const { validarCampos } = require('../middlewares/validar-campos');

//Iniciar sesión

//  api/auth
router.post('/',
    // [
    //     check('email','Agrega un email valido').isEmail(),
    //     check('password','El password debe de tener minimo 6 caracteres').isLength({min: 6}),
    //     validarCampos
    // ],
        authUsuario)

//Obtener el usuario autenticado
router.get('/',ValidarUsuario, usuarioAutenticado)

module.exports =  router ;