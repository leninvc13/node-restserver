
const express = require('express')
const app = express()
const bcrypt = require('bcrypt');   
const _ = require('underscore');
const Usuario = require('../models/usuarios');
const { verificacionToken, verificacionAdminRole } = require('../middlewares/autenticacion');

app.get('/usuarios', verificacionToken, (req, res) => {
    let desde = req.query.desde || 0;
        desde = Number(desde);
    let limite = req.query.limite || 5;
        limite = Number(limite);


    Usuario.find({estado: true}, 'nombre role estado')
            .skip(desde)
            .limit(limite)
            .exec((err, usuarios) => {
                if( err ){
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

            Usuario.countDocuments({estado: true}, (err, conteo) =>{
                res.json({
                    ok: true,
                    usuarios,
                    conteo
                })
                
            })
            
            
        })
  });
  
  app.post('/usuarios', [verificacionToken,verificacionAdminRole],function(req, res){
      let body = req.body;

      let usuario = new Usuario({
          nombre: body.nombre,
          email: body.email,
          password:bcrypt.hashSync(body.password, 10),
          role: body.role
      });

      usuario.save( (err, UsuarioDB) => {   
        if( err ){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        UsuarioDB.password = null;

        res.json({
            ok: true,
            usuario: UsuarioDB
        })

      });

  })
  
  app.put('/usuarios/:id', [verificacionToken,verificacionAdminRole],function(req, res){
      let id = req.params.id;
      let body = _.pick( req.body, ['nombre','email', 'img','role','estado'] );

        Usuario.findByIdAndUpdate(id, body, { new : true, runValidators: true } ,(err, UsuarioDB) => {

            if( err ){
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                usuario: UsuarioDB
            })
        })


  })


  app.delete('/usuarios/:id',[verificacionToken,verificacionAdminRole], function(req, res){
    let id = req.params.id;
    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado, {new : true},(err, UsuarioBorrado) => {

        if( err ){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if( !UsuarioBorrado ){
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Usuario no encontrado',

                }
            });
        }

        res.json({
            ok: true,
            usuario: UsuarioBorrado
        });
    })
})

  
//   app.delete('/usuarios/:id', function(req, res){
//       let id = req.params.id;

//       Usuario.findByIdAndRemove(id, (err, UsuarioBorrado) => {
//         if( err ){
//             return res.status(400).json({
//                 ok: false,
//                 err
//             });
//         }

//         if( !UsuarioBorrado ){
//             return res.status(400).json({
//                 ok: false,
//                 error: {
//                     message: 'Usuario no encontrado',

//                 }
//             });
//         }

//         res.json({
//             ok: true,
//             usuario: UsuarioBorrado
//         });

//       });
//   })


  module.exports = app;