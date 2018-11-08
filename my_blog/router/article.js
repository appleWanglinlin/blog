const express = require('express')
const router = express.Router()
const controller = require('../controller/article.js')
//监听客户端的get请求地址，显示文章添加页面
router.get('/article/add',controller.handleGetArticleAdd)

//监听客户端的post请求地址，实现添加文章功能
router.post('/article/add',controller.handlePostArticleAdd)

//监听客户端的get请求，实现文章详情功能
router.get('/article/info/:id',controller.handleGetArticleInfo)
module.exports = router