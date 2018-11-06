const express = require('express')
const router = express.Router()
const controller = require('../controller/user.js')
//访问register.ejs
router.get('/register',controller.handleGetRegister)

//访问login.ejs
router.get('/login',controller.handleGetLogin)

//注册
router.post('/register',controller.handlePostRegister)

//登录
router.post('/login',controller.handlePostLogin)

//注销
router.get('/logout',controller.handleGetLogout)
module.exports = router