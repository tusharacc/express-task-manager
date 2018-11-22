const express = require('express');
const bodyParser = require('body-parser')
const db = require('./database.js')

const app = express();

app.use(bodyParser.json())

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods',"GET, POST, OPTIONS");
    next()
})

app.get('/api/tasks',(req,res,next) => {
    console.log('Calling get function');
    db.get()
    .then((data) => {
        console.log(data);
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(404).json(err);
    });
    
});

app.post('/api/posts',(req,res,next) => {
    //db.post({'parent_id':2,'task':'New Task','start_date':'2018-10-09','end_date':'2018-12-31','priority':20,'status':False})
    console.log(req.body);
    db.post(req.body)
      .then((data)=>{
        res.status(200).json(data);
      })
      .catch((err)=>{
        res.status(404).json(err);
      });
    
});

app.post('/api/update',(req,res,next)=>{
    console.log('app.js',req.body)
    let result = db.update(req.body);
    result.then((data)=>{
        console.log('returned data',data);
        res.status(200).json(data);
    },(err)=>{
        console.log(err);
        res.status(404).json(err);
    });
    
});




module.exports = app;