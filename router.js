var express = require("express");
const crypto = require('crypto');
var php = require("phpcgijs");
const path =require('path');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('./backend/model/users')
const  credential = {
    email : "admin@gmail.com",
    password : "admin123"
}

async function digestMessage(message) {
    const hash = crypto.createHash('sha256');
   const finalHex = hash.update(message).digest('hex');
   return finalHex;


  }

// login user
router.post('/login', async (req, res)=>{
    var user = await User.findOne({ mail: req.body.email },{ mail:1 , pass:1 });
    
    pass =digestMessage(req.body.password);
    
    if(req.body.email == user.mail &&  await pass  == user.pass){
        req.session.user = req.body.email;
        res.redirect('/route/choice');
        res.end("Login Successful...!");
    }else{
        res.end("Invalid Username")
    }
});



    

/*
router.post('/', (req, res)=>{
    
    req.session.user = req.body.email;
    res.redirect('/route/signin');
    res.end("Login Successful...!");

});
*/

router.get('/game', (req, res)=>{
    
    //req.session.user = req.body.email;
    res.render('game');
    //res.end("Login Successful...!");

});

router.get('/equipe', (req, res)=>{
    
    //req.session.user = req.body.email;
    res.render('equipe');
    //res.end("Login Successful...!");

});

router.get('/apropos', (req, res)=>{
    
    //req.session.user = req.body.email;
    res.render('apropos');
    //res.end("Login Successful...!");

});

// route for dashboard
router.get('/choice', (req, res) => {
    if(req.session.user){
        res.render('accueil_connect', {user : req.session.pseudo})
    }else{
        res.send("Unauthorize User")
    }
})


// route for dashboard
router.post('/signin_conf', async  (req, res) => {
    
    const pass1= await digestMessage(req.body.password);
    console.log(pass1);
    const user = new User({
        mail: req.body.email,
        pseudo : req.body.pseudo,
        pass: pass1,
    });
    user.save()
        .then(() => res.render('signin_conf', {user : req.session.user}))
        .catch(error => res.status(400).json({error}) );
    
});

//router.get("/", php.cgi("acceuil", { cgi_path: '/usr/bin/', options: { "-c": "/etc/php.ini" } }));

router.post('/signin', (req, res) => {
    
    res.render('base_sign')
    
});


// route for logout
router.get('/logout', (req ,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base', { title: "Express", logout : "logout Successfully...!"})
        }
    })
})





module.exports = router;


/*
router.get('/game', (req, res) => {
    if(req.session.user){
        res.render('game')
    }else{
        res.send("Unauthorize User")
    }
})
*/

/*
var p = path.join("acceuil/php");
var exec = require("child_process").exec;
router.get(p, (req, res) => {
    exec("php acceuil.php", function (error, stdout, stderr) {res.send(stdout);});
    
})
*/

/*
var exec = require("child_process").exec;
router.get('/phph/pages/acceuil.php', function(req, res){exec("php /phph/pages/apropos.php", function (error, stdout, stderr) {res.send(stdout);});});
*/