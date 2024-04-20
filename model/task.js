var mongoose = require('mongoose')

var taskschema=new mongoose.Schema({
    taskname:{
        type:String
    },
    username:{
        type:String
    },
    sta:{
        type:String,
        default:"Pending"
    }
})

module.exports =mongoose.model("task",taskschema)