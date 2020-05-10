//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

//Importamos controladores
const tareaController = require('../controllers/tareaController');
const autetication = require('../middleware/autentication');


//Crear tarea
//api/tarea
router.post('/',
    autetication, 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('idProyect', 'El proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.addTarea
);

//Listar tarea
//api/tarea
router.get('/',
    autetication,
    tareaController.listTareas
);

//Actualizar tarea
//api/tarea
router.put('/:id',
autetication, 
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('idProyect', 'El proyecto es obligatorio').not().isEmpty()
],
    tareaController.updateTarea
);

//Eliminar tarea
//api/tarea
router.delete('/:id',
autetication,
tareaController.deleteTarea
);
module.exports = router;