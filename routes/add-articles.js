const express = require('express');
const router = express.Router();

let Article= require('../models/article-add');

router.get('/add', (req, res)=>{
 
    res.render('add_article',{
        title: 'Add article'
    })
})

//Add Submit POST Route
router.post('/add', (req,res)=>{
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('author', 'Author is required').notEmpty();
  req.checkBody('body', 'Body is required').notEmpty();
  //Get Errors
  let errors = req.validationErrors();
  if(errors){

    res.render('add_article',{
        title:'Add Article',
        errors: errors
    })
  }else{

  let article =new Article();
  article.title=req.body.title;
  article.author=req.body.author;
  article.body=req.body.body;
  article.save((err)=>{
      if(err){
        req.flash('success','hmmm failed')
        // res.redirect('/')
          console.log(err)
          return;
      }else{
          req.flash('success','Aricle Added')
          res.redirect('/')
      }
  })
}

})
module.exports = router  