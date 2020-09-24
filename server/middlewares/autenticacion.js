const jwt = require('jsonwebtoken');

// =====================================
// Verificacion de token
//======================================
let verificacionToken = ( req, res, next ) => {
    let token = req.get('token');

    jwt.verify( token, process.env.Seed, (err, decoded) =>{
        if( err ){
            return res.status(401).json({
                ok: false,
                err
            });
        }
        req.usuario = decoded.usuario;
        next();

    })

};

// =====================================
// Verificacion de Role Admin
//======================================
let verificacionAdminRole = ( req, res, next ) => {
    let usuario = req.usuario;

    if(usuario.role === 'ADMIN_ROLE'){
        next();
    }
    else{
        if( err ){
            return res.status(401).json({
                ok: false,
                err: {
                    message: "El usuario no es administrador"
                }
            });
        }

        next();
    }

};


module.exports = {
    verificacionToken,
    verificacionAdminRole
}