const express = require('express');
const router = express.Router();

//Bring in models
let Article= require('../models/article-add');

//Load Add article

//Get single article
router.get('/articles/:id', (req, res)=>{
    Article.findById(req.params.id, (err, article)=>{
        if(err){
            // console.log(err)
        } else {
            // console.log(article)
            res.render('article', {
                article:article,
            })
        }  
    })
})


//Load edit  form
router.get('/articles/edit/:id', (req, res)=>{
    // console.log(req.params.id)
    Article.findById(req.params.id, (err, article)=>{
        if(err){
            // console.log(err)
        } else {
            console.log(article)
            res.render('edit_article', {
                title:'Edit Article',
                article:article,
            })
        }
      
    })
})

//Update Submit POST Route
router.post('/articles/edit/:id', (req,res)=>{
    let article = {};
    article.title=req.body.title;
    article.author=req.body.author;
    article.body=req.body.body;

    let query = {_id:req.params.id}
    Article.update(query, article,  (err)=>{
        if(err){
            console.log(err)
            return;
        }else{
            req.flash('success','Aricle Updated')
            res.redirect('/')
        }
    })
  })

//delete
 router.delete('/articles/:id', function(req,res){
    console.log('Deleted')
    let query = {_id:req.params.id}
    Article.remove(query,function(err){
        if(err){
            console.log(err)
        }else console.log('success');
        res.send('Success')
        })
    })

module.exports = router  
