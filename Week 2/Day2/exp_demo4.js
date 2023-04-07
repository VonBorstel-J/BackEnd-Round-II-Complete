var express = require('express');
var app = express();

app.get('/home', function(req, res) {
    res.send('Home Page');
});
app.get('/about', function(req, res) {
    res.send('About Page');
});

app.listen(3000);


