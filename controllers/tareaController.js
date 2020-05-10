const Tarea = require('../models/Tarea');
const Proyect = require('../models/Proyect');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.addTarea = async (req, res) => {

    //Revisamos si hay errores
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {idProyect} = req.body;

    try {
       const proyect = await Proyect.findById(idProyect);

       if(!proyect){
            res.status(404).send('Poryecto no existe');
       }

       //Verificar el creador del proyecto
       if(proyect.creador.toString() !== req.user.id){
            return res.status(404).json({msg: 'Usuario no autorizado'});
        }

        //Creamos la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.status(200).send({tarea});
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

//Obtienen las tareas del proyecto
exports.listTareas = async (req, res) => {

    //Extraer el proyecto y comprobar si existe
    const {idProyect} = req.query;

    try {
        const proyect = await Proyect.findById(idProyect);
        if(!proyect){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        //Verificar el creador del proyecto
        if(proyect.creador.toString() !== req.user.id){
            return res.status(404).json({msg: 'Usuario no autorizado'});
        }

        //Obtener las tareas por proyecto
        const tareas = await Tarea.find({idProyect});
        res.status(200).send(tareas);
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

exports.updateTarea = async (req, res) => {

    //Revisamos si hay errores
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    //Extraer el proyecto y comprobar si existe
    const {idProyect, nombre, estado} = req.body;
    try {
        let tarea = await Tarea.findById(req.params.id);
        if(!tarea){
            return res.status(404).json({msg: 'Tarea no encontrado'});
        }

        proyect = await Proyect.findById(idProyect);

        //Verificar el creador del proyecto
        if(proyect.creador.toString() !== req.user.id){
            return res.status(404).json({msg: 'Usuario no autorizado'});
        }

        //Crear nueva tarea
        const newTarea = {};
     
            newTarea.nombre = nombre;    
            newTarea.estado = estado;
       

        tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, newTarea, {new: true});
        res.status(200).send(tarea);
    }catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

exports.deleteTarea = async (req, res) => {

    //Extraer el proyecto y comprobar si existe
    const {idProyect} = req.query;
    try {
        let tarea = await Tarea.findById(req.params.id);
        if(!tarea){
            return res.status(404).json({msg: 'Tarea no encontrado'});
        }

        proyect = await Proyect.findById(idProyect);

        //Verificar el creador del proyecto
        if(proyect.creador.toString() !== req.user.id){
            return res.status(404).json({msg: 'Usuario no autorizado'});
        }

        //Eliminar
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.status(200).send({msg: 'Tarea eliminada'});
    }catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}