
//Puerto
process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDataBase;

if(process.env.NODE_ENV === 'dev'){
    urlDataBase = 'mongodb://localhost:27017/cafe';
}
else{
    urlDataBase = 'mongodb+srv://leninvc13:D4v1d1402@cluster0.ijzhn.mongodb.net/test';
}

process.env.urlDataBase = urlDataBase;


