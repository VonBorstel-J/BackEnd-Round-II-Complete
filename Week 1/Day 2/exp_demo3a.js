var express = require('express');
var router = express.Router(); 

router.get('/home', function(req,res){ 
    res.send("Hello world!");
});

router.post('/home', function(req, res){ 
    res.send("You just called the post method at '/hello'!\n")
});

//Instead of using an app listen we can just use module.export and link it to another file 

module.exports = router; 