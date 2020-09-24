const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;


let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} No es un rol valido'
}

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es Obligatorio']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El Email es Obligatorio']

    },
    password: {
            type: String,
            required: [true, 'El Paswword es Obligatorio']
    },
    img: {
        type: String,

    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default : true,
    }, //Boolean    
    google: {
        type: Boolean,
        default: true
    } //Boolean

});


usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único'})

module.exports = mongoose.model( 'Usuarios', usuarioSchema);

