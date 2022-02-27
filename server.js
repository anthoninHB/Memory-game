//import { uuidv4 } from 'uuidv4';
const express = require('express');
//var php = require("./main");
var php = require("phpcgijs");
const path =require('path');

const bodyparser = require("body-parser");
const session = require ("express-session");
const { v4: uuidv4 } = require('uuid');
const router = require('./router');
const mongoose = require('mongoose');
const User = require('./backend/model/users')

mongoose.connect('mongodb+srv://memory_game:memory_game22@cluster0.r2opl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  

const app = express();
//var p = path.join("acceuil/php");
const port = process.env.PORT||3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))

app.set('view engine','ejs');

app.use('/static', express.static(path.join(__dirname, '/public')))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))
//app.use("/", php.cgi("acceuil", { cgi_path: '/usr/bin/', options: { "-c": "/etc/php.ini" } }));
app.use(session({
    secret: uuidv4(), //  '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    resave: false,
    saveUninitialized: true
}));

app.use('/route', router);

app.get('/',(req,res)=>{
    res.render('accueil');
})

app.get('/signin',(req,res)=>{
  res.render('base_sign',{title:"Login System"});
})

app.get('/equipe',(req,res)=>{
  res.render('equipe',{title:"Login System"});
})

app.get('/login',(req,res)=>{
  res.render('base');
})

app.get('/apropos',(req,res)=>{
  res.render('apropos');
})
app.get('/acceuil',(req,res)=>{
  res.render('choice',{title:"Login System"});
})



app.get('/classement',(req,res)=>{
  res.render('classement',{title:"Login System"});
})


app.listen(port, ()=>{console.log("Listenning to the server on http://localhost:3000")});
