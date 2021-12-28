const Proyecto = require('../models/Proyecto');

const crearProyecto = async (req, res) => {

    try {
        //Crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);

        //Guardar el creador via jwt
        proyecto.creador = req.usuario.id

        await proyecto.save();
        res.json(proyecto);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hubo en error"
        })
    }

}

const obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({creador: req.usuario.id});
        res.json({
            proyectos
        })
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

const actualizarProyectos = async (req, res) => {
    //Extraer la informacion del proyecto
    const { nombre } = req.body;
    const nuevoProyecto = {};
    if (nombre) {
        nuevoProyecto.nombre = nombre;
    }
    try {
        //Revisar el id 
        let proyecto = await Proyecto.findById(req.params.id);
        //console.log(proyecto); //guarda el objeto
        //Si el proyecto existe o no 
        if (!proyecto) {
            return res.status(404).json({
                msg: 'Proyecto no encontrado'
            })
        }
        //Verificar el creador del proyecto 
        if (proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({
                msg: 'No autorizado'
            })
        }
        //actualizar 
        proyecto = await Proyecto.findByIdAndUpdate({_id: req.params.id}, {$set: nuevoProyecto}, {new: true});
        res.json({
            proyecto
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor'
        })
    }
}

const eliminarProyecto = async (req, res) => {

    try {
        //Revisar el id 
        let proyecto = await Proyecto.findById(req.params.id);
        //Si el proyecto existe o no 
        if (!proyecto) {
            return res.status(404).json({
                msg: 'Proyecto no encontrado'
            })
        }
        //Verificar el creador del proyecto 
        if (proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({
                msg: 'No autorizado'
            })
        }
        //Eliminar el Proyecto
        await Proyecto.findOneAndRemove({_id: req.params.id})
        res.json({
            msg: 'Proyecto eliminado'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor'
        })
    }
}

module.exports = {
    crearProyecto,
    obtenerProyectos,
    actualizarProyectos,
    eliminarProyecto
}