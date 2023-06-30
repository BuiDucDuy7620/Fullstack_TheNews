const express=require('express')
const newsController = require('../controller/newsController')
const newsRouter=express.Router()
const verify=require('../middleware/verify.js')

newsRouter.post('/createNews',newsController.createNews)
newsRouter.get('/getAllNews',newsController.getAllNews)
newsRouter.get('/getNewsById/:id',newsController.getNewsById)
newsRouter.get('/getNewsByUserID/:id',newsController.getNewsByUserID)
newsRouter.get('/getNewsByDate',newsController.getNewsByDate)
newsRouter.put('/updateNewsById/:id',newsController.updateNewsById)
newsRouter.delete('/deleteNewsById/:id',newsController.deleteNewsById)

module.exports = newsRouter