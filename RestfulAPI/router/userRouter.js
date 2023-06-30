const express = require('express');
const userRouter=express.Router();
const userController = require('../controller/userController.js')
const verify=require('../middleware/verify.js')
userRouter.get('/getUserLogin',verify,userController.getUserLogin)
userRouter.get('/getAllUsers',verify,userController.getAllUsers)
userRouter.get('/getUserById/:id',verify,userController.getUserById)
userRouter.get('/getUserByName',verify,userController.getUserByName)
userRouter.get('/getTotalUsers',verify,userController.getTotalUsers)
userRouter.put('/updateUserById/:id',verify,userController.updateUserById)
userRouter.delete('/deleteUserById/:id',verify,userController.deleteUserById)
userRouter.post('/register',userController.register)
userRouter.post('/login',userController.login)
module.exports =userRouter