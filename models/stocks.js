const mongoose = require('mongoose');
const {Schema} =mongoose;
var stocksSchema=new Schema({
    Date:Date,
    Open:Number,
    High:Number,
    Low:Number,
    Close:Number,
   },{
       timestamps:true
   });
 module.exports=mongoose.model('Stocks',stocksSchema);   