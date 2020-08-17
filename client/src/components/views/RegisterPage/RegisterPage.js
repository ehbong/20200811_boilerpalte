import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [Name, setName] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log('Email', Email);
        console.log('Password', Password);

        if(Password !== ConfirmPassword){
            return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
        }

        let body = {
            email : Email,
            password : Password,
            name : Name
        }

        dispatch(registerUser(body))
            .then(res => {
                console.log(res.payload);
                if(res.payload.success){
                    props.history.push('/login');
                }else{
                    alert("error")
                }
            })

    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{display: 'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}
            >
                <label htmlFor="">Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label htmlFor="">Name</label>
                <input type="text" value={Name} onChange={onNameHandler}/>
                <label htmlFor="">Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <label htmlFor="">Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
                <br />
                <button>
                    회원가입
                </button>
            </form>
        </div>
    )
}

export default RegisterPage
