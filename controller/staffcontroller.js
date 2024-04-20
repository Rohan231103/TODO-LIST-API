var staffmodel=require('../model/staff')
var taskmodel=require('../model/task')
var bcrypt=require('bcrypt')
const storage = require('node-persist');
storage.init( /* options ... */ );


exports.stafflogin= async (req,res)=>{
    var data = await staffmodel.find({"email":req.body.email})
    var login_status=await storage.getItem('staff_id')
    if(login_status==undefined)
    {
        if(data.length==1)
        {
            bcrypt.compare(req.body.password, data[0].password, async function(err, result) {
                if(result==true)
                {
                    // login_status=1
                    // login_status=await storage.setItem('admin_id',data[0].id)
                    console.log(await storage.setItem('staff_id',data[0].id));
                    res.status(200).json({
                        status:"Login Success"
                    })
                    
                }else{
                    res.status(200).json({
                        status:"Check your Email and Password"
                    })
                }
            });    
        }else{
            res.status(200).json({
                status:"Check your Email and Password"
            })
        }
    }else{
        res.status(200).json({
            status:"Staff is already login"
        })
    }
}

exports.  stafflogout=async (req,res)=>{
    storage.removeItem('staff_id')
    res.status(200).json({
        status:"Staff Logout"
    })
}

exports.viewtask=async (req,res)=>{
    var login_status=await storage.getItem('staff_id')
    if(login_status!=undefined){
        var data=await staffmodel.find({"email":req.body.email})

        if(data.length>0){
            var view_task=await taskmodel.find({"username":data[0].name})

            if(view_task.length>0){
                res.status(200).json({
                    view_task
                })
            }
            else{
                res.status(200).json({
                    status:"User has not assign a Task"
                })
            }
        }else{
            res.status(200).json({
                status:"Check your Email and Password"
            }) 
        }
    }else{
        res.status(200).json({
            status:"Please Login"
        }) 
    }
}

// Update Task
exports.updatetask=async (req,res) => {
    var login_status=await storage.getItem('admin_id')

    if(login_status!=undefined) {
        var id = req.params.id;

        // Fetch __v from the database
        var existingData = await taskmodel.findById(id);
        var __v=await existingData.__v
        var sta;

        if(__v==0){
            sta="Pending"
        }else if(__v==1){
            sta="Accepted"
        }else if(__v==2){
            sta="Runing"
        }else if(__v==3){
            sta="Complete"
        }
        
        req.body.sta=sta
        var data=await taskmodel.findByIdAndUpdate(id,req.body)

        res.status(200).json({
            status:"Task Updated",
            newStatus:sta
        })
    }else{
        res.status(200).json({
            status:"Please Login"
        })
    }
}