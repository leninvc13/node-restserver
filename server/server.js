

require('./config/config');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use( require('./routes/usuarios') );

mongoose.connect(process.env.urlDataBase, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true
        }, (err) => {
            if (err) {
                throw err;
 
            }
            console.log('Base de Datos online');
 
        });

 

 
app.listen(process.env.PORT, () => {
    console.log('escuchando puerto: ', 3000);
});