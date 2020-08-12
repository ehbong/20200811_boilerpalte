const express = require('express');
const app = express();
const port = 5050
const bodyParser = require('body-parser');
const { User } = require('./models/User');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose'); // mongoose 불러오기 
// mongodb 연결
mongoose.connect('mongodb+srv://ehbong:q1w2e3r4@boilerpalte.xiue1.mongodb.net/boilerpalte?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.get('/', (req, res)=> res.send('Hello World!~안녕하세요 ~ '));


app.post('/register', (req, res)=> {
    // 회원 가입 할때 필요한 정보들을 client에서 가져오면
    // 데이터 베이스에 넣어준다.

    const user = new User(req.body)

    user.save((err, doc)=>{
        if(err) return res.json({succes: false, err})
        return res.status(200).json({
            succes:true
        })
    })
})


app.listen(port, ()=> console.log(`Example app listening on port ${port}!`));



