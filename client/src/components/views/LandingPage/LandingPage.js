import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { logoutUser } from '../../../_actions/user_action';
// import { withRouter } from 'react-router-dom';

const LandingPage = (props) => {

    const dispatch = useDispatch();
    
    useEffect(()=> {
        axios.get('/api/hello') // 임의로 서버 호출
            .then(response => console.log(response));
    }, [])

    const logoutHandler = ()=>{
        dispatch(logoutUser())
            .then(res=>{
                console.log(res);
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
            <h2>시작 페이지</h2>
            <button onClick={logoutHandler}>
                로그아웃
            </button>
        </div>
    );
}

export default LandingPage;
