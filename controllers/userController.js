const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.addUser = async (req, res) => {

    //Revisamos si hay errores
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    //Estraemos los datos
    const {email, password} = req.body;

    try {
        //Validamos si existe un usuario en BD
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({msg: 'El usuario ya existe'});
        }

        //Creamos usiario con la estructura del json recibido
        user = new User(req.body);

        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        //Guardamos el usuario en BD
        await user.save();

        //Crear y firmar el JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        //Firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 //Una hora
        }, (error, token) => {
            if(error) throw error;

            //Mensaje de confirmacion
            res.status(200).json({token});
        });       
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}