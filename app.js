const express = require('express')
const dotenv = require('dotenv').config({path:'./env/.env'})
const cookieParser = require('cookie-parser')
const app = express()


//VIEW ENGINE
app.set('view engine', 'ejs')

//STATIC
app.use('/public',express.static('public'))
app.use('/public',express.static(__dirname + 'public'))

//DATA PROCESS 
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//COOKIES
app.use(cookieParser())

//ROUTER
app.use('/', require('./routes/routes'))

//ELIMINATE CACHE 
app.use(function(req, res, next) {
    if (!req.user) 
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});


//PORT
const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log('server running on port : ' + port)
})

