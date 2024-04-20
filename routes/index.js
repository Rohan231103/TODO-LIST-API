var express = require('express');
var router = express.Router();
var admin=require('../controller/admincontroller')

// Add Admin
// router.post('/',admin.addadmin)
router.post('/adminlogin',admin.adminlogin)
router.get('/adminlogout',admin.adminlogout)

router.post('/addstaff',admin.addstaff)
router.post('/addtask',admin.addtask)

module.exports = router;
