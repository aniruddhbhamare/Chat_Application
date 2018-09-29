const path = require('path');
const express = require('express');

var app = express();
var port = process.env.PORT || 3000;

var publicPath = path.join(__dirname + '/../public');
console.log(publicPath);

app.use(express.static(__dirname + '/../public'));

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});
