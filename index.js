const express = require('express')
const helmet  = require('helmet')
const morgan  = require('morgan')
const cors    = require('cors')
import path from "path";
const dotenv  = require('dotenv')
const rfs     = require('rotating-file-stream')


import connectDatabase from './src/configs/db.config'
dotenv.config()

connectDatabase()

const port = process.env.PORT || 3000
const isProduction = process.env.NODE_ENV === 'production'
const app = express()

app.use(helmet())

const accessLogStream = rfs.createStream('access.log', {
    interval: "1d",
    path: path.join(__dirname, "log"),
})
app.use(isProduction ? morgan('combined', {stram: accessLogStream}) : morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api', require('./src/routes/router').default)

app.get('/', (req,res) => {
    res.json({
        message: "Hello Van Hoang ne"
    })
})

app.get('*', (req,res) => {
    res.json({
        message: "Hello Hoang"
    })
})

app.listen(port, () => {
    console.log(`Server is starting on port: ${port}`)
})