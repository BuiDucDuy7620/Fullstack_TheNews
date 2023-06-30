const express = require('express')
const commentRouter=express.Router()    
const commentController=require('../controller/commentController.js')
const verify=require('../middleware/verify.js')

commentRouter.post('/createComment',commentController.createComment)
commentRouter.get('/getAllComments',commentController.getAllComments)
commentRouter.get('/getCommentById/:id',commentController.getCommentById)
commentRouter.get('/getAllCommentsByNewsId/:id',commentController.getAllCommentsByNewsId)
commentRouter.put('/updateCommentById/:id',commentController.updateCommentById)
commentRouter.delete('/deleteCommentById/:id',commentController.deleteCommentById)

module.exports =commentRouter