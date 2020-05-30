const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport =require('passport');
//Bring in models
let user= require('../models/user');
//Register Form
router.get('/register', function(req, res){
    res.render('register',{ title:'Register'
        
    });
})

// Register Process
router.post('/register',function(req, res){
const name = req.body.name;
const email = req.body.email;
const username= req.body.username;
const password= req.body.password;
const repassword = req.body.repassword;
req.checkBody('name', 'Name is required').notEmpty();
req.checkBody('email', 'Email is required').notEmpty();
req.checkBody('email', 'Email is is not valid').isEmail();
req.checkBody('username', 'Username is required').notEmpty();
req.checkBody('password', 'Password is required').notEmpty();
req.checkBody('repassword', 'Confirm password is required').notEmpty();

let errors = req.validationErrors();
if(errors){
res.render('register', {
errors:errors
})
}else{
    let newUser = new user({
name:name,
email: email,
username:username,
password:password
})
bcrypt.genSalt(10,function(err, salt){
    bcrypt.hash(newUser.password,salt,function(err,hash){
        if(err){
            console.log(err)
        }
        newUser.password = hash
        newUser.save(function(err){
            if(err){
                console.log(err)
                return;
            } else{
                req.flash('success','You are now Registered and can log in')
                res.redirect('/login')
            }
        })
    })
})
}
})
//Login Form
router.get('/login', function(req, res){
res.render('login') ;
})
//Login Process
router.post('/login', function(req,res,next){
passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/user/login',
    failureFlash:true
})(req, res,next);
})
module.exports = router