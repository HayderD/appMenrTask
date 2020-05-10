//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

const autetication = require('../middleware/autentication');

//Importamos controladores
const autenticationController = require('../controllers/autenticationController');

//Login usuario
// api/autentication
router.post('/',
    autenticationController.loginUser
);

//Obtener user
//api/autentication
router.get('/', 
    autetication,
    autenticationController.userLogin
);

module.exports = router;
