let mo = require('mongoose');
let artSchma =mo.Schema({    
   id:{
        type: String,
        required: false
    },  
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required:true
    },
    body:{
        type:String,
        required:true
    }

})
let article = module.exports= mo.model('Article',artSchma);