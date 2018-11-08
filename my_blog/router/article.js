const express = require('express')
const router = express.Router()
const controller = require('../controller/article.js')
//监听客户端的get请求地址，显示文章添加页面
router.get('/article/add',controller.handleGetArticleAdd)

//监听客户端的post请求地址，实现添加文章功能
router.post('/article/add',controller.handlePostArticleAdd)

//监听客户端的get请求，实现添加后跳到文章详情页
router.get('/article/info/:id',controller.handleGetArticleInfo)

//实现点击文章详情页的编辑按钮跳到编辑文章信息页面
router.get('/article/edit/:id',controller.handleGetArticleEdit)

//实现编辑后数据的更新
router.post('/article/edit',controller.handlePostArticleEdit)
module.exports = router