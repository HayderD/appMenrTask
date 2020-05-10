//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

//Importamos controladores
const userController = require('../controllers/userController');

//Crear usuario
// api/users
router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'agregar un email valido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({min: 6})
    ],
    userController.addUser
);

module.exports = router;
