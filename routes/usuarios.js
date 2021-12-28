//Rutas para crear usuarios
const express = require('express');
const { crearUsuario } = require('../controllers/usuario');
const router = express.Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');



//Crear usuario  
//api/usuarios
router.post('/', 
 [
    check('nombre','El nombre es Obligatorio').not().isEmpty(),
    check('email','Agrega un email valido').isEmail(),
    check('password','El password debe de tener minimo 6 caracteres').isLength({min: 6}),
    validarCampos
 ], 
 crearUsuario) ;


module.exports =  router ;