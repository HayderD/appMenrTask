const mongoose = require('mongoose');

const ProyectSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    creado: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('Proyect', ProyectSchema);