const express = require('express');
const conectDB = require('./config/bd');
const cors = require('cors');

//Crear servidor
const app = express();

//Conectar al servidor DB
conectDB();

//Habilitar cors
app.use(cors());

//Habilitar express.json
app.use(express.json({extended: true})); 

//Puerto de la app
const port = process.env.port || 4000;

//Importamos rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/autentication', require('./routes/autentication'));
app.use('/api/proyect', require('./routes/proyect'));
app.use('/api/tarea', require('./routes/tarea'));

//Definir la pagina principal
app.get('/', (req, res) => {
    res.send('Hola Mundo');
});

//Arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});