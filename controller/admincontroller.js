var adminmodel=require('../model/admin')
var staffmodel=require('../model/staff')
var taskmodel=require('../model/task')
var bcrypt=require('bcrypt')
const storage = require('node-persist');
storage.init( /* options ... */ );

// exports.addadmin=async(req,res)=>{
//     var b_pass = await bcrypt.hash(req.body.password,10);
//     req.body.password=b_pass;
//     var data=await adminmodel.create(req.body)
//     res.status(200).json({
//         status:"Admin Added"
//     })
// }

// Admin Login
exports.adminlogin= async (req,res)=>{
    var data = await adminmodel.find({"email":req.body.email})
    var login_status=await storage.getItem('admin_id')
    if(login_status==undefined)
    {
        if(data.length==1)
        {
            bcrypt.compare(req.body.password, data[0].password, async function(err, result) {
                if(result==true)
                {
                    // login_status=1
                    // login_status=await storage.setItem('admin_id',data[0].id)
                    console.log(await storage.setItem('admin_id',data[0].id));
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
            status:"Admin is already login"
        })
    }
}

// Admin Logout
exports.adminlogout=async (req,res)=>{
    storage.removeItem('admin_id')
    res.status(200).json({
        status:"Admin Logout"
    })
}

// Add Staff
exports.addstaff=async(req,res)=>{
    var login_status=await storage.getItem('admin_id')
    if(login_status!=undefined){
        var b_pass=await bcrypt.hash(req.body.password,10)
        req.body.password=b_pass
        var data=await staffmodel.create(req.body)
        res.status(200).json({
            status:"Staff Added"
        })
    }else{
        res.status(200).json({
            status:"Please Login"
        })
    }
}

// AddTask
exports.addtask=async(req,res)=>{
    var login_status=await storage.getItem('admin_id')
    if(login_status!=undefined){
        var data=await taskmodel.create(req.body)
        res.status(200).json({
            status:"Task Added"
        })
    }else{
        res.status(200).json({
            status:"Please Login"
        })
    }
}



// exports.updatetask = async (req, res) => {
//     var login_status = await storage.getItem('admin_id');

//     if (login_status != undefined) {
//         var id = req.params.id;

//         // Fetch __v from the database
//         var existingData = await taskmodel.findById(id);
//         if (!existingData) {
//             return res.status(404).json({ error: "Task not found" });
//         }

//         var __v = existingData.__v;

//         var sta; 
//         if (__v == 0) {
//             sta = "Pending";
//         }else if (__v == 1) {
//             sta = "Accepted";
//         }else if (__v == 2) {
//             sta = "Running";
//         }else if (__v == 3) {
//             sta = "Complete";
//         }
        
//         // Include sta in req.body
//         req.body.sta = sta;
        
//         // Update document with new sta
//         var data = await taskmodel.findByIdAndUpdate(id, req.body);

//         res.status(200).json({
//             status: "Task Updated",
//             newStatus: sta
//         });
//     } else {
//         res.status(200).json({
//             status: "Please Login"
//         });
//     }
// }
