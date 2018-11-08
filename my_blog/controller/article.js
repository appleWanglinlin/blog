const moment = require('moment')
const conn = require('../db/db.js')
const marked = require('marked')
module.exports ={
    handleGetArticleAdd(req,res){
        //如果用户没有登录，则不允许访问文章添加页
        if(!req.session.isLogin) return res.redirect('/')
        res.render('./article/add.ejs',{
         user:req.session.user,
         isLogin:req.session.isLogin
        })
    },
    handlePostArticleAdd(req,res){
        const article = req.body
        //作者的id
        article.auther_id = req.session.user.id
        article.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        const sql = 'insert into articles set ?'
        conn.query(sql,article,(err,result)=>{
            if(err) return res.status(500).send({status:500,msg:'添加失败，请重试'})
            if(result.affectedRows !=1) res.status(400).send({status:400,msg:'添加失败，请重试'})
            res.send({status:200,msg:'添加成功',insertId:result.insertId})
        })
    },
    handleGetArticleInfo(req,res){
        const id = req.params.id
        const sql = 'select * from articles where id=?'
        conn.query(sql,id,(err,result)=>{
            if(err || result.length !== 1) return res.render('./404.ejs')
            //如果找到文章，就将文章转换为html标签
            result[0].content = marked(result[0].content)
            res.render('./article/info.ejs',{
                user:req.session.user,
                isLogin:req.session.isLogin,
                article:result[0]
            })
        })
       
    }
}