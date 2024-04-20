var mongoose=require('mongoose');

var staffschema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
})

module.exports =mongoose.model("staff",staffschema)