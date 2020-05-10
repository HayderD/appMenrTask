const Proyect = require('../models/Proyect');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.addProyect = async (req, res) => {

    //Revisamos si hay errores
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        //Validamos si existe un usuario en BD       
        let proyect = await Proyect.findOne(req.body);
        
        if(proyect){
            return res.status(400).json({msg: 'El proyecto ya existe'});
        }

        //Creamos usiario con la estructura del json recibido
        proyect = new Proyect(req.body);

        //Pasamos el id del credor atraves del token
        proyect.creador = req.user.id;

        //Creamos el proyecto
        proyect.save();
        
         //Mensaje de confirmacion
         res.status(200).json(proyect);
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

//Lista los proyectos de un usuario
exports.listProyects = async (req, res) => {
    try {
        //Lista todos los proyectos asociados a un creador
        const proyects = await Proyect.find({creador: req.user.id});
        //Mensaje de confirmacion
        res.status(200).json({proyects});
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

//Actuliza un proyecto
exports.editProyect = async (req, res) => {

    //Revisamos si hay errores
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {nombre} = req.body;
    const newProyect = {};

    if(nombre){
        newProyect.nombre = nombre;
    }

    try {
        //Revisar Id
        let proyect = await Proyect.findById(req.params.id);
        
        //Si el proyecto existo no
        if(!proyect){
            return res.status(404).json({msg: 'El proyecto no existe'});
        }

        //Verificar el creador del proyecto
        if(proyect.creador.toString() !== req.user.id){
            return res.status(404).json({msg: 'usuario no autorizado'});
        }

        //Actualizar
        proyect = await Proyect.findByIdAndUpdate({_id: req.params.id}, {$set: newProyect}, {new: true});
        res.status(200).json({proyect});
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

    //Actuliza un proyecto
exports.deleteProyect = async (req, res) => {
    try {
        //Revisar Id
        let proyect = await Proyect.findById(req.params.id);
        
        //Si el proyecto existo no
        if(!proyect){
            return res.status(404).json({msg: 'El proyecto no existe'});
        }

        //Verificar el creador del proyecto
        if(proyect.creador.toString() !== req.user.id){
            return res.status(404).json({msg: 'usuario no autorizado'});
        }

        //eliminar
        await Proyect.findOneAndRemove({_id: req.params.id});

        res.status(200).json({msg: 'Proyecto eliminado'});
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }    
}


