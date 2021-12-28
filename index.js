const express = require('express');
const conectarDB = require('./config/db')
const cors = require('cors')
//Crear el servidor 
const app = express();

//Conectar a la bd
conectarDB();

//Habilitar cors
app.use(cors())

//Habilitar express.json
app.use(express.json({ extended: true }));

//Puerto de la app
const PORT = process.env.PORT || 4000;

//Importar Rutas 
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/proyectos',require('./routes/proyectos'));
app.use('/api/tareas',require('./routes/tareas'));

app.use('*/:error', (req,res)=> {
    const {error} = req.params
    res.status(404).json({
        msg: `Ruta ${error} no existe`
    })
})


//Arrancar la app
app.listen(PORT, ()=>{
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});