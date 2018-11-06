module.exports = {
    handleGetIndex(req,res){
        //如果登录成功了 req.session中就会有user属性
        //默认情况下，session的过期时间就是关闭浏览器，因为关闭浏览器后，
        // cookie的值也就没有了，无法记录sessionid
        // console.log(req.session)
        res.render('index.ejs',{
            user:req.session.user,
            isLogin:req.session.isLogin
        })
    }
}