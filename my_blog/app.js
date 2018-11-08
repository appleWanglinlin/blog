const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const session = require('express-session')

const app = express()

//设置默认的模板引擎
app.set('view engine','ejs')

//模板的跟目录，将来渲染页面时都相对此路径
app.set('views','./views')

//托管静态资源
app.use('/node_modules',express.static('./node_modules'))

//注册body-parser中间件，注册以后才可以在req中使用body对象获取客户端post提交过来的数据
app.use(bodyParser.urlencoded({ extended: false }))

//只要注册了session的中间件，以后任何一个可以使用req对象的地方都可以访问到req.session
app.use(session({
    secret: 'blog niubility',
    resave: false,
    saveUninitialized: false
}))
//  //导入首页的路由模块
//  const indexRouter = require('./router/index.js')
//  app.use(indexRouter)

//  //导入用户模块
// const userRouter = require('./router/user.js')
// app.use(userRouter)

//自动导入router目录下所有的路由模块
fs.readdir('./router',(err,result)=>{
    result.forEach(item=>{
        const router = require(path.join(__dirname,'./router',item))
        app.use(router)
    })
})
app.listen(3000,()=>{
    console.log('server running at http://127.0.0.1:3000')
})