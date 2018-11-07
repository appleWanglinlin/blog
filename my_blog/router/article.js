const express = require('express')
const router = express.Router()
const controller = require('../controller/article.js')
//监听客户端的get请求地址，显示文章添加页面
router.get('/article/add',controller.handleGetArticleAdd)
module.exports = router