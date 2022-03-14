const express = require('express')
const router = express.Router()

//CONNECTION
const connection = require('../database/db')
const authController = require('../controllers/authController') 


//ROUTER FOR VIEWS
router.get('/', authController.isAuthenticated, (req,res)=>{
    res.render('index',{user:req.user}) 
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/register',(req,res)=>{
    res.render('register')
})
router.get('/matchgame', authController.isAuthenticated, (req,res)=>{
    res.render('matchgame',{user:req.user})
})



//ROUTER FOR CONTROLLER METHODS
router.post('/register', authController.register)
router.post('/login',authController.login)
router.get('/logout',authController.logout) 

module.exports = router 