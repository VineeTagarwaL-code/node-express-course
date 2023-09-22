const express = require('express')
const server = express()
const tasks = require('./routes/tasks')
const connect = require('./db/connect')

const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require("./middleware/error-handler")
require('dotenv').config()
server.use(express.json())
server.use(express.static('./public'))
server.use(express.urlencoded({ extended: true }))


server.use('/api/v1/tasks' , tasks)

//404
server.use(notFound)
server.use(errorHandlerMiddleware)


const startServers = async ()=>{
    try{
        await connect()
        server.listen(process.env.PORT , ()=>{
            console.log(`Server starteda at ${process.env.PORT}`)
        })
        
    }catch(error){
        console.log("server starting errors " , error)
    }
}

startServers()