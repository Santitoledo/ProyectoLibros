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

nunjucks.configure(path.join(__dirname + '/views/'), {
    autoescape: false,
    express: app
});

const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = 'mongodb+srv://dbuser:dbuserp455w0rd!@cluster0.3ryhk.mongodb.net/tv?retryWrites=true&w=majority/restapi';

app.get("/", (req, res) => {
    res.status(200).render('index.html');
});

app.all('/login', function (req, res) {
    if (!req.body.usuario || !req.body.contrasenia) {
        res.send('Login failed');    
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

      app.get('/book/:isbn', (req, res)=>{	  
        MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
        const dbo = db.db("restapi"); 
           
        dbo.collection("libros").findOne({"isbn":req.params.isbn},function(err, data) {   	
            if (data){     
                res.status(200).render('book.html',{title:data.title,authors:data.authors,publishedDate:data.publishedDate,country:data.country,description:data.description,pageCount:data.pageCount}
                );	
            }else{
                res.status(404).send(`<p>FAIL</p>`)
    
            }    		
          });
      });	
      });	
 
app.get('/logout', function (req, res) {
     req.session.destroy();
     res.render('logout.html', )
 });
 

app.post('/add', (req, res)=>{
    var autores = [];
   if(req.body.authors1){
       autores.push(req.body.authors1)
       if(req.body.authors2){
           autores.push(req.body.authors2)
           if(req.body.authors3){
               autores.push(req.body.authors3)
               if(req.body.authors4){
                   autores.push(req.body.authors4)
                       if(req.body.authors5){
                           autores.push(req.body.authors5)
                       }
                   
               }
           }    
           
       }
   }
   var fecha = new Date(req.body.publishedDate)
    MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
    const dbo = db.db("restapi")
    console.log(autores);
    console.log(req.body);
    dbo.collection("libros").insertOne(
        {   
            isbn: req.body.isbn,
            title: req.body.title,
            authors: autores,
            publishedDate: fecha ,
            country: req.body.country,
            IDpublisher: req.body.IDpublisher,
            description : req.body.description,
            pageCount: req.body.pageCount,
            
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
    var input = ``
    var fecha =  new Date()
    var varf = fecha.getFullYear()
    MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
        const dbo = db.db("restapi");
        var editoriales = ""; 
        dbo.collection("publisher").find({}).toArray()
        .then((data) => { 
            console.log(data)
            for(editorial of data){
                editoriales += `<option value="${editorial.id}">${editorial.publisher}</option>`;
            } 
         res.status(200).render('add.html',{option:editoriales,fecha:varf});
        }) 
      })
   
});  
app.get('/buscador', (req, res)=>{	  
    //Obtenemos el valor del término de búsqueda
    var termino = req.query.busqueda;  
    // Creamos la expresión regular para poder verificar que contenga el término el nombre en la base de datos. La i significa no sensible a may/min
    var expresiontermino = new RegExp(termino,"i");
    MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
    const dbo = db.db("restapi");    
    dbo.collection("libros").find({"title":{$regex: expresiontermino }}).toArray(function(err, data) {	      
        res.render('resultado.html',{logeado:req.session.login, admin:req.session.admin,termino:termino,data:data});
    });
});	
});	 
app.listen(8080);