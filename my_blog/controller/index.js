const conn = require('../db/db.js')
module.exports = {
    handleGetIndex(req,res){
        //每页显示的条数
        const pageSize = 3
        //当前页//获取通过？c传过来的参数
        const currentPage =parseInt(req.query.page) || 1
        
        //如果登录成功了 req.session中就会有user属性
        //默认情况下，session的过期时间就是关闭浏览器，因为关闭浏览器后，
        // cookie的值也就没有了，无法记录sessionid
        // console.log(req.session)
        const sql = `select a.id,u.nickname,u.ctime,a.title from articles as a 
        left join users as u 
        on a.auther_id = u.id
        order by id desc
        limit ${(currentPage-1)*pageSize},${pageSize};
        select count(*) as count from articles`
        conn.query(sql,(err,result)=>{
            //总页数
            const totalPage = Math.ceil(result[1][0].count/pageSize)
            if(err) {
                return res.render('index.ejs',{
                    user:req.session.user,
                    isLogin:req.session.isLogin,
                    articles:[[]]
                })
            }
            res.render('index.ejs',{
                user:req.session.user,
                isLogin:req.session.isLogin,
                articles:result[0],
                totalPage:totalPage,
                currentPage:currentPage
            })
        })

      
    }
}