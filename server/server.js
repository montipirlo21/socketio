﻿const path = require('path');
var express = require('express')

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

app.use(express.static(publicPath));


app.listen(3000, () => {
    console.log("Server is up on port " + port);
});

// GithHub repo + push 
// Create and heroku application and deploy