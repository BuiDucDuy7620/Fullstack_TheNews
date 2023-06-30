const express= require('express')
const mongoose= require('mongoose')
const db='mongodb://localhost/TheNews'
const router= require('./router/router.js')

const app = express()
mongoose.connect(db)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

var cors = require('cors');
app.use(cors());
router(app)

app.listen(5000,()=>{console.log('server listening on port 5000');})