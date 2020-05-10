const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {

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

            if(!user){
                return res.status(400).json({msg: 'El usuario no existe'});
            }

            //Revisar el password
            const passwordCorrecto = await bcryptjs.compare(password, user.password);

            if(!passwordCorrecto){
                return res.status(400).json({msg: 'El password es incorrecto'});
            }

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
            res.status(500).send('Hubo un error');
        }
}

exports.userLogin = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json({user});
    } catch (error) {
        console.log(error);
            res.status(500).send('Hubo un error');
    }
}
