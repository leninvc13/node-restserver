const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express()
const Usuario = require('../models/usuarios');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);


app.post('/login', (req, res) => {

let body = req.body;

 Usuario.findOne({email : body.email}, (err, UsuarioDB) =>{
    if( err ){
        return res.status(500).json({
            ok: false,
            err
        });
    }

    if(!UsuarioDB){
        return res.status(400).json({
            ok: false,
            err:{
                message: "Usuario o contraseña incorrecto"
            }
        });
    }

    if(!bcrypt.compareSync(body.password, UsuarioDB.password) ){
        return res.status(400).json({
            ok: false,
            err:{
                message: "Usuario o contraseña incorrecto"
            }
        });
    }

    let token = jwt.sign({
        usuario: UsuarioDB 
    }, process.env.Seed, { expiresIn: process.env.ExpiracionToken });

    res.json({
        ok: true,
        usuario: UsuarioDB,
        token: token
        });


      })


})

// ======================================================
// Configuraciones de google
// ======================================================

// async function verify(token) {
//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
//         // Or, if multiple clients access the backend:
//         //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//     });
//     const payload = ticket.getPayload();
//     const userid = payload['sub'];
//     // If request specified a G Suite domain:
//     // const domain = payload['hd'];
//     return {
//         nombre: payload.name,
//         email: payload.email,
//         img: payload.picture,
//         google: true
//     }
//   }

// app.post('/google', async (req, res) => {
    
//     let token = res.body.idtoken;

//     let googleUser = await verify(token)
//                 .catch(e => {
//                         return res.status(403).json({
//                             ok: false,
//                             err: e
//                         }); 
//                 });

            

//     Usuario.findOne({ email: googleUser.email}, (err, usuarioDB) =>{
//         if( err ){
//             return res.status(500).json({
//                 ok: false,
//                 err
//             });
//         };

//         if(usuarioDB){
//             if(usuarioDB.google === false){
//                 return res.status(400).json({
//                     ok: false,
//                     err: {
//                         message: "Debe usar su auntenticación web"
//                     }
//                 });
//             }
//             else{
//                 let token = jwt.sign({
//                     usuario: usuarioDB 
//                 }, process.env.Seed, { expiresIn: process.env.ExpiracionToken });
    
//                 return res.json({
//                     ok: true,
//                     usuario: usuarioDB,
//                     token
//                 });
//             }

//         }
//         else{
//             //Si el usuario existe en la base de datos
//             let usuario = new Usuario();
//             usuario.nombre = googleUser.nombre;
//             usuario.password = ":)";
//             usuario.email = googleUser.email;
//             usuario.google = true;
//             usuario.img = googleUser.img;

//             usuario.save( (err, usuarioDB) => {
//                 if( err ){
//                     return res.status(500).json({
//                         ok: false,
//                         err
//                     });
//                 }

//                 let token = jwt.sign({
//                     usuario: usuarioDB 
//                 }, process.env.Seed, { expiresIn: process.env.ExpiracionToken });
    
//                 return res.json({
//                     ok: true,
//                     usuario: usuarioDB,
//                     token,
//                 });

//             });

//         }


//     });

//     })






module.exports = app;