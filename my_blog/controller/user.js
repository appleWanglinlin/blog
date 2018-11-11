const conn = require('../db/db.js')
const moment = require('moment')
//导入加密模块
const bcrypt = require('bcrypt')
//定义一个幂次
const saltRounds = 10;//2^10
module.exports = {
    handleGetRegister(req,res){
        res.render('./user/register.ejs',{})
    },
    handleGetLogin(req,res){
        res.render('./user/login.ejs',{})
    },
    handlePostRegister(req,res){
        const user = req.body
        //判断不能为空
        if(user.username.length<=0||user.password.length<=0||user.nickname.length<=0) 
        return res.status(400).send({static:400,msg:'请输入完整的用户信息'})
        //判断用户名重复
        const sql = 'select count(*) as count from users where username=?'
        conn.query(sql,user.username,(err,result)=>{
            //判断sql语句是否有问题，服务器端的错误
            if(err) return res.status(500).send({static:500,msg:'用户请求失败'})
            //用户名是否重复        
            if(result[0].count!=0) 
            return res.status(402).send({status:402,msg:'用户名重复'})
    
            //给用户添加创建时间的属性
            user.ctime = moment().format('YYYY-MM-DD HH:mm:ss')

            //在执行sql语句之前，先对用户提供的密码，做一层加密，防止密码被泄露之后，明文被盗取的情况
            // bcrypt.hash('要被加密的密码','循环的次数','回调函数')
            bcrypt.hash(user.password,saltRounds,(err,pwd)=>{
                if(err) return res.status(500).send({status:500,msg:'注册用户失败'})
                user.password = pwd
                 //当满足添加条件时执行的代码
                const sql = 'insert into users set ?'
                conn.query(sql,user,(err,result)=>{
                    if(err || result.affectedRows!=1) return res.status(500).send({status:500,msg:'用户添加失败'})
                    res.send({status:200,msg:'用户添加成功'})
                })
            })
        })
    },
    handlePostLogin(req,res){
        //未加密时的登录操作
        //获得客户端提交过来的数据
        const user = req.body
        // //执行sql语句，查询用户是否存在，密码是否正确
        // const sql = 'select * from users where username = ? and password = ?'
        // conn.query(sql,[user.username,user.password],(err,result)=>{
        //     if(err) return res.status(500).send({status:500,msg:'登录失败'})
        //     if(result.length === 0) return res.status(400).send({status:400,msg:'用户名或密码错误'})
        //     //登录成功后存储用户信息到session中
        //     req.session.user = result[0]
        //     req.session.isLogin = true
        //     //设置session过期时间
        //     let time = 30 * 24 * 60 * 60 * 1000//假设时间为一个月
        //     req.session.cookie.expires = new Date(Date.now()+time)
        //     res.send({status:200,msg:'用户登录成功'})
        // })


        //加密后的登录操作
        //执行sql语句，查询用户是否存在，密码是否正确
        const sql = 'select * from users where username = ?'
        conn.query(sql,user.username,(err,result)=>{
            if(err) return res.status(500).send({status:500,msg:'登录失败'})
            if(result.length === 0) return res.status(400).send({status:400,msg:'用户名或密码错误'})

            
            //登录成功后存储用户信息到session中
            req.session.user = result[0]
            req.session.isLogin = true
            //设置session过期时间
            let time = 30 * 24 * 60 * 60 * 1000//假设时间为一个月
            req.session.cookie.expires = new Date(Date.now()+time)
            res.send({status:200,msg:'用户登录成功'})
        })
    },
    handleGetLogout(req,res){
        //该回调函数执行表示销毁成功
        req.session.destroy(err=>{
            //使用res.redirect方法，可以让客户端重新访问到指定的页面
            res.redirect('/')
        })
    }
}