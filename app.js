var express = require('express')
var ejs		= require('ejs')
var fs 		= require('fs')
var bodyPar = require('body-parser').urlencoded({extended:true})
var mysql	= require('mysql')
var pool	= mysql.createPool({host:'localhost', database:'storethairathtv', user:'store', password:'dreamz'})
var app 	= express()

app.engine('html', ejs.renderFile)
app.listen(80, startApp)
app.get('/', store)
app.get('/store', store)
app.get('/login', login)
app.get('/store', bodyPar, testGet)
app.get('/camera', showCamera)

app.use(express.static('public'))
app.use(express.static('photo'))
app.use(showError)

function login(req, res){
	res.render('login.html')
}

function store(req, res){
	res.render('store.html')
}

function startApp(){
	console.log('Webserver staring on port:80')
}

function showCamera(req, res){
    pool.query('select * from a_camera;',function(error, data){
        res.render('camera.html', {result: data})//แสดงผล ส่งแบบobject
    })  
}
function showError(req, res){
	res.status(404).render('error.html')
}
function testGet(req, res){
    if(req.body.selectCamera != null && req.body.battery){
            console.log('Success')
    }   
}
//-----------------------------------------------------------------------------
//app.get('/showTables', (req, res) => ( pool.query('show tables;' ,(error, data) => { res.send(data)})))
//app.get('/testInsert', (req, res) => ( pool.query('insert into camera(name, tvb,a1, a2, a4, a9, date) values ("Yo sup man",200111,250,600,60,255, now());' ,(erro,data) => {res.send(data)})))
