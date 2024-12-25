const dotenv = require('dotenv').config()
//creating the database
const mongoose = require('mongoose');

const db_url = process.env.MONGO_URI;


const database = (url)=>{

    mongoose.connect(db_url)
    .then(()=>{
        console.log('The database is currently live!')
    })
    .catch((err)=>{
            console.log('The database didnt connect,please check the connection conditions.::',err)
    })
            
    }
    


module.exports = database
