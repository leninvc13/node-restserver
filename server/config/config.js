
//Puerto
process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDataBase;

if(process.env.NODE_ENV === 'dev'){
    urlDataBase = 'mongodb://localhost:27017/cafe';
}
else{
    urlDataBase = process.env.MONGO_URI;
}

process.env.urlDataBase = urlDataBase;

//Expiracion token
//'este-es-el-seed-desarrollo',{ expiresIn: 60 * 60 *24 * 30
//Segundos * Minutos * Horas * Dias
process.env.ExpiracionToken =  60 * 60 *24 * 30;

//Seed para el JWT
process.env.Seed = 'este-es-el-seed-desarrollo';


process.env.CLIENT_ID = process.env.CLIENT_ID || '343205436917-3js5350h8ongtlc5ttc9o9aqhm4gqjr6.apps.googleusercontent.com';


