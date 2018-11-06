const express = require('express')
const router = express.Router()
const controller = require('../controller/index.js')
  //访问index.ejs
router.get('/',controller.handleGetIndex)

module.exports = router
   