const express = require('express');
const app = express();
const http = app.listen(3000);
const user = require('./Routes/user');


app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Lang'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    next();
})

app.use('/user', user)

app.get('/', (req,res)=>{
    res.send('server is running')
})