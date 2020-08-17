const express = require('express');
const app = express();
const port = 5050
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require('./models/User');
const { auth } = require('./middleware/auth');

const config = require('./config/key');
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose'); // mongoose 불러오기 
// mongodb 연결
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.get('/', (req, res)=> res.send('Hello World!~안녕하세요 ~ '));

app.get('/api/hello', (req, res)=> {
    res.send("안녕하세요~");
})

app.post('/api/users/register', (req, res)=> {
    // 회원 가입 할때 필요한 정보들을 client에서 가져오면
    // 데이터 베이스에 넣어준다.

    const user = new User(req.body)

    user.save((err, doc)=>{
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success:true
        })
    })
});

app.post('/api/users/login', (req, res)=>{
    console.log("로그인 요청");
    // 요청된 이메일이 DB에 있는지 찾는다.
    User.findOne({email: req.body.email}, (err, user)=>{
        console.log("유저 검색");
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "제동된 이메일에 해당하는 유저가 없습니다."
            })
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."});

            // 비밀번호 까지 맞다면 토큰을 생성하기
            user.generateToken((err, user)=>{
                if(err) return res.status(400).send(err);

                // 토큰을 저장한다.
                res.cookie("x_auth", user.token)
                .status(200)
                .json({loginSuccess: true, userId: user._id});


            });
        });
    })
});

app.get('/api/users/auth', auth, (req, res)=>{
    // 여기까지 오면 인증 통과
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
});

app.get('/api/users/logout', auth, (req, res)=>{
    User.findOneAndUpdate({_id: req.user._id}, {token: ""}, (err, user)=>{
        if(err) return res.json({ success: false, err});
        return res.status(200).send({
            success: true
        });
    });
});


app.listen(port, ()=> console.log(`Example app listening on port ${port}!`));



