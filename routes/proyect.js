//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

//Importamos controladores
const proyectoController = require('../controllers/proyectoController');
const autetication = require('../middleware/autentication');

//Crear proyecto
//api/proyect
router.post('/',
    autetication, 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty()
    ],
    proyectoController.addProyect
);

//Lista proyectos por usuario
//api/proyect
router.get('/',
    autetication,
    proyectoController.listProyects
);

//Actualiza proyecto
//api/proyect
router.put('/:id',
    autetication, 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty()
    ],
    proyectoController.editProyect
);

//Elimina un proyecto
//api/proyect
router.delete('/:id',
    autetication,
    proyectoController.deleteProyect
);

module.exports = router;