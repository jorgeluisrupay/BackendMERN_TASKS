const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { ValidarUsuario } = require("../middlewares/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { crearTarea, obtenerTareas, actualizarTarea, eliminarTarea } = require("../controllers/tarea");


// Crear Tareas
// api/tareas
router.post('/',ValidarUsuario,
[
    check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty(),
    check("proyecto", "El Proyecto es obligatorio").not().isEmpty(),
    validarCampos
],crearTarea)

//Listar tareas de un proyecto
router.get("/", ValidarUsuario , obtenerTareas)

//Actualizat tarea
router.put("/:id", ValidarUsuario , actualizarTarea)

//Eliminar tarea
router.delete("/:id", ValidarUsuario, eliminarTarea)


module.exports = router;