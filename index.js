const express = require('express')
const dotenv =  require('dotenv').config()
// dotenv.config()
const cors = require('cors')

const dbConnect = require('./src/db')
const userRouter = require('./src/routes/userRouter')

const app = express()
app.use(express.json())
app.use(cors())
app.use('/',userRouter)

dbConnect()

app.get('/',(req,res)=>{
    res.send("hello express app user")
})

const port = process.env.PORT

app.listen(port,()=>{
    console.log(`Server running in http://localhost:${port}`);
})




