
const Tarea = require('../models/Tarea')
const Proyecto = require('../models/Proyecto')

//Crea una nueva tarea 

const crearTarea = async (req, res) => {

    try {
        //Extrar el proyecto y comprobar si existe
        const {proyecto} = req.body;
        const isProyecto = await Proyecto.findById(proyecto);
        if (!isProyecto) {
            return res.status(404).json({ 
                msg: 'Proyecto no encontrado'
             })
        }
        //Revisar si el proyecto actual pertenece al usuario auth 
        if (isProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({
                msg: 'No autorizado'
            })
        }
        //Creamos la tarea 
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({
            tarea
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            msg: 'Hubo un error'
         })
    }

}

//Obtener tareas 
const obtenerTareas = async (req, res) => {
    try {
        //Extrar el proyecto y comprobar si existe
        const {proyecto} = req.query;
        const isProyecto = await Proyecto.findById(proyecto);
        if (!isProyecto) {
            return res.status(404).json({ 
                msg: 'Proyecto no encontrado'
             })
        }
        //Revisar si el proyecto actual pertenece al usuario auth 
        if (isProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({
                msg: 'No autorizado'
            })
        }

        //Obtener las tareas por proyecto 
        const tareas = await Tarea.find({proyecto}).sort({creado: -1})
        res.json({tareas})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            msg: 'Hubo un error'
         })
    }
}

//Actualizar Tarea 
const actualizarTarea = async (req, res) => {

    try {
        //Extrar el proyecto y comprobar si existe
        const {proyecto, nombre, estado} = req.body;

        //Si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id)
        if (!tarea) {
            return res.status(404).json({
                msg: 'No existe esa tarea'
            })
        }
        //Extraer proyecto  
        const isProyecto = await Proyecto.findById(proyecto);
        
        //Revisar si el proyecto actual pertenece al usuario auth 
        if (isProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({
                msg: 'No autorizado'
            })
        }
        //Crear un objeto con la nueva informacion
        const nuevaTarea = {};
        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;

        //Guardar la tarea 
        tarea = await Tarea.findByIdAndUpdate({_id: req.params.id}, nuevaTarea, {newest: true});
        res.json({ 
            tarea
         })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            msg: 'Hubo un error'
         })
    }
} 

const eliminarTarea = async (req, res) => {

    try {
        //Extrar el proyecto y comprobar si existe
        const {proyecto, nombre, estado} = req.query;

        //Si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id)
        if (!tarea) {
            return res.status(404).json({
                msg: 'No existe esa tarea'
            })
        }
        //Extraer proyecto  
        const isProyecto = await Proyecto.findById(proyecto);
        
        //Revisar si el proyecto actual pertenece al usuario auth 
        if (isProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({
                msg: 'No autorizado'
            })
        }

        //Eliminar la tarea 
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({ 
            msg:'Tarea eliminada'
         })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            msg: 'Hubo un error'
         })
    }
}

module.exports = {
    crearTarea,
    obtenerTareas,
    actualizarTarea,
    eliminarTarea
}