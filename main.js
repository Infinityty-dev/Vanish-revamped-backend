const express = require('express');
const database = require('./database/config.js');
const signUp = require('./schema/userSchema.js');
const router = require('./route/UserandDriverRoute.js');


const server = express();
const port = 5500;


database()
server.use(express.json());


server.use('/api/v1',router)


  



server.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})