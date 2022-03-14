const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const connection = require('../database/db')
const {promisify} = require('util')

//register process
exports.register = async (req,res)=>{
    try {
        const {user,fullname,pass} = req.body
        let passwordHash = await bcryptjs.hash(pass,8)

         connection.query('INSERT INTO films_users SET ?',{user:user,fullname:fullname,pass:passwordHash},(error,result)=>{
             if (error) {
                 console.log(error)
             }
             res.redirect('/')
         })

    }catch (error) {
        console.log(error)
    }
}


//Login process
exports.login = async (req,res)=>{
    try {
        const {user,pass}= req.body
        
        if(!user || !pass){
            res.render('login',{
                alert:true,
                alertTitle:"Warning",
                alertMessage:"Please insert user/password",
                alertIcon:"warning",
                showConfirmButton:true,
                timer:false,
                ruta:'login'
              })
        }else {
            connection.query('SELECT * FROM films_users WHERE user = ?',[user], async(error,result)=>{
                if(result.length == 0 || !(await bcryptjs.compare(pass, result[0].pass))){
                    res.render('login',{
                    alert:true,
                    alertTitle:"Error",
                    alertMessage:"invalid User/password",
                    alertIcon:"error",
                    showConfirmButton:true,
                    timer:false,
                    ruta:'login'
                    })
                }else {
                    //succesfull log in
                    const id = result[0].id
                    //CREATE TOKEN
                    const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
                        expiresIn:process.env.JWT_TIEMPO_EXPIRA
                    })
                    console.log('TOKEN: ' + token+ "for user: "+user )

                    //cookies
                    const cookiesOptions = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly:true
                    }
                    res.cookie('jwt', token, cookiesOptions) 
                    res.render('login',{
                        alert:true,
                        alertTitle:"Successful log in",
                        alertMessage:"¡WELCOME TO TREND TV SERIES!",
                        alertIcon:"success",
                        showConfirmButton:false,
                        timer:1500,
                        ruta:'' 
                    })
                }
            })
        }

    }catch (error) {
        console.log(error)
    }
}

exports.isAuthenticated = async (req,res,next)=>{
    //verifing cookie exists
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRETO)
            connection.query('SELECT * FROM films_users WHERE id = ?',[decodificada.id],(error,result)=>{
                if(!result){
                    return next()
                }
                req.user = result[0]
                return next()
            }) 
        } catch (error) {
            console.log(error)
            return next()
        }
    }else {
        res.redirect('/login')
        
    }
}

exports.logout = (req,res)=>{
    res.clearCookie('jwt')
    return res .redirect('/')
}