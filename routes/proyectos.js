const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { ValidarUsuario } = require("../middlewares/auth");
const {
  crearProyecto,
  obtenerProyectos,
  actualizarProyectos,
  eliminarProyecto,
} = require("../controllers/proyecto");

// Crear Proyectos
// api/proyectos
router.post(
  "/",
  [
    ValidarUsuario,
    check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearProyecto
);

//Obtener los proyectos de un usuario autenticado
router.get("/", [ValidarUsuario], obtenerProyectos);

//Actualizar proyecto via ID
router.put(
  "/:id",
  [
    ValidarUsuario,
    check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarProyectos
);

//Eliminar un Proyecto
router.delete("/:id", 
    ValidarUsuario, 
    eliminarProyecto);
module.exports = router;
