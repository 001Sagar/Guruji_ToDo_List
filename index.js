const { json, urlencoded } = require('body-parser');
const { EJSON } = require('bson');
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

// Require Mongodb
const db = require('./config/mongoose')

app.get('/',(req,res)=>{
    res.send("<h1>Yeah ! Server is Run</h1>");
})
// Body Parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const route = require('./routes/route');
app.use('/api',route);
app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("Server is Run on Port::",port);
})