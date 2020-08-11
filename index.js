const express = require('express');
const app = express();
const port = 5050

const mongoose = require('mongoose'); // mongoose 불러오기 
// mongodb 연결
mongoose.connect('mongodb+srv://ehbong:q1w2e3r4@boilerpalte.xiue1.mongodb.net/boilerpalte?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.get('/', (req, res)=> res.send('Hello World!~안녕하세요 ~ '));
app.listen(port, ()=> console.log(`Example app listening on port ${port}!`));



