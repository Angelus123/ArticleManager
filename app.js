const express = require('express');
const router = express.Router();
const mongoose=require('mongoose')
const path =  require('path')
const bodyParser = require('body-parser')
const expressValidator =require('express-validator');
const flash = require('connect-flash');
const session =require('express-session')
const passport = require('passport')
const config = require('./config/database')
// Make connection to DB 
// database:'mongodb://localhost:27017/simpledb'
mongoose.connect(config.database,{useNewUrlParser:true})
let db = mongoose.connection;
//Check for DB connection? 

// Check for DB errors
db.once('open',()=>console.log('mongoDB ok'))
db.on('err', () => console.log(err));

// Init App
const app = express();

// //Bring in models
let Article= require('./models/article-add')

// Load view Engine
app.set('views',path.join( __dirname,'views'));
app.set('view engine','pug');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
//Set public folder
 app.use(express.static(path.join(__dirname,'public')));

 //<><<<<><<><<><><><messaging session <><><<><><><><><><><><><><//

//Express session middleware
 app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    
  }))
//Express messages middleware
  app.use(require('connect-flash')());
  app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
  });

// Express validator middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));
  //passport config
  require('./config/passport')(passport);
  app.use(passport.initialize());
  app.use(passport.session());
  app.get('/', (req,res) => {
   
    Article.find({}, (err, artcls) => { 
        if(err){
         console.log('Error is'+ err);
     }else{

            res.render('index', {
                  title:'Articles',
                  articles: artcls
                
              }) 
            }
          })
        })

// // //Route==============================================
const addArticles = require ('./routes/add-articles') ;
const articles = require ('./routes/articles') ;
const users= require ('./routes/users') ;
app.use(addArticles)
app.use( articles );
app.use (users);

app.use((req, res, next) => {
  
 res.status(404).sendFile(path.join(__dirname, 'views', 'page-not-found.html'));
});
 //Home route----------------------------------------------------------

//start server
app.listen('3000',()=>console.log('Server ok'))