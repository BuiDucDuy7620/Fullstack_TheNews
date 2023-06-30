const userRouter=require('./userRouter.js')
const newsRouter=require('./newsRouter.js')
const commentRouter=require('./commentRouter.js')

const Router=(app)=>{
    app.use('/api/user',userRouter);
    app.use('/api/news',newsRouter);
    app.use('/api/comment',commentRouter);
}
module.exports=Router;