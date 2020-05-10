const mongoose = require('mongoose');

const TareaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    estado: {
        type: Boolean,
        default: false
    },

    creado: {
        type: Date,
        default: Date.now()
    },

    idProyect: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyect'
    }
});

module.exports = mongoose.model('Tarea', TareaSchema);