var express = require('express');
var router = express.Router();
var staff=require('../controller/staffcontroller')

router.post('/stafflogin',staff.stafflogin);
router.get('/stafflogout',staff.stafflogout)

router.get('/viewtask',staff.viewtask);
router.post('/updatetask/:id',staff.updatetask)



module.exports = router;
