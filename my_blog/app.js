const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const moment = require('moment')
const app = express()

const conn  = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'blog'
})

app.set('view engine','ejs')
app.set('views','./views')


app.use('/node_modules',express.static('./node_modules'))
app.use(bodyParser.urlencoded({ extended: false }))

//访问index.ejs
app.get('/',(req,res)=>{
    res.render('index.ejs',{})
})
//访问register.ejs
app.get('/register',(req,res)=>{
    res.render('./user/register.ejs',{})
})

//访问login.ejs
app.get('/login',(req,res)=>{
    res.render('./user/login.ejs',{})
})

//注册
app.post('/register',(req,res)=>{
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
        //当满足添加条件时执行的代码
        const sql = 'insert into users set ?'
        conn.query(sql,user,(err,result)=>{
            if(err || result.affectedRows!=1) return res.status(500).send({status:500,msg:'用户添加失败'})
            res.send({status:200,msg:'用户添加成功'})
        })
    })
})

app.listen(3000,()=>{
    console.log('server running at http://127.0.0.1:3000')
})