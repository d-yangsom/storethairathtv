var express = require('express')
var ejs		= require('ejs')
var fs 		= require('fs')
var app 	= express()

app.engine('html',ejs.renderFile)
app.listen(80, function(){
	console.log('Webserver staring on port:80')
})
app.get('/',(req, res) => res.render('index.html'))



