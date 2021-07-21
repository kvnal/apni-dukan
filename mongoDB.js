const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const productsSchema= new Schema({
   
    title:{
        type: String,
        required : true
    },
    
    description:{
        type: String,
        required : true
    },
    
    price:{
        type:Number,
        required : true
    },
    
    available:{
        type:Boolean,
    },
    
    rating:{
        type: Number
    },
    
    category:{
        type: String,
        required : true
    },
    
    by:{
        type: String
    }

},{timestamps:true});

const products = mongoose.model('products',productsSchema)

module.exports = products
