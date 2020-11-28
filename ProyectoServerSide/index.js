var express = require('express'),
app = express(),
session = require('express-session');
const nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
const sha256 = require('sha256')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'string-supersecreto-nuncavisto-jamas',
    name: 'sessionId',
    proxy: true,
    resave: true,
    saveUninitialized: true ,
    cookie: { maxAge:  60 * 60 * 1000 }  
}));
const path = require('path');
app.use('/public', express.static(path.join(__dirname + '/public')));

nunjucks.configure('views', {
    autoescape: false,
    express: app
  });

const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = 'mongodb+srv://dbuser:dbuserp455w0rd!@cluster0.3ryhk.mongodb.net/tv?retryWrites=true&w=majority/restapi';

 
//Index
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/');
});


app.all('/login', function (req, res) {
    if (!req.body.usuario || !req.body.contrasenia) {
        res.send('No se ha podido hacer el login');    
} 
else {

    MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
        const dbo = db.db("restapi");  
        
        dbo.collection("usuarios").findOne({$and:[{"nombre_usuario":req.body.usuario},{"contrasenia":(sha256(req.body.contrasenia)).toUpperCase }]},function(err, usuario) {             
         
            if(usuario){
                req.session.login = true;  
                req.session.nombre = usuario.nombre_usuario;
                req.session.admin = usuario.admin;
                res.status(200).render('index.html',{logeado:req.session.login, admin:req.session.admin, usuario:req.session.nombre});
            }
            else{
                res.status(401).send("You have not been authorized");
            } 
        })
    });
}
    
});
 
app.get('/logout', function (req, res) {
     req.session.destroy();
     res.render('logout.html', )
 });
 

app.post('/add', (req, res)=>{
    MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
    const dbo = db.db("libros")
    
    dbo.collection("libros").insertOne(
        {   
            isbm: parseInt(req.body.isbm),
            title: req.body.title,
            authors: req.body.authors,
            publishedDate: req.body.publishedDate,
            country: req.body.country,
            editorial: req.body.editorial
            
        },
        function (err, res) {
            if (err) {
            db.close();
            return console.log(err);
            }
            db.close()
        })
        res.status(200).send('<p>Book added successfully</p><p><a href="/add">Add book</a></p><p><a href="/">Return home</a></p>')
    })
}) 
app.get('/add', function (req, res) {
    req.session.destroy();
    res.render('add.html', )
});   
app.listen(8080);