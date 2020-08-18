import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRout = null){

    // null => 아무난 출입
    // true => 로그인한 유저
    // true => 로그인하면 출입불가

    function AuthenticationCheck(props){
        const dispatch = useDispatch();
        useEffect(()=>{
            dispatch(auth())
                .then(res => {
                    console.log(res);

                    //로그인 하지 않은 상태
                    if(!res.payload.isAuth){
                        if(option){
                            props.history.push("/login");
                        }
                    }else{
                        if(adminRout && !res.payload.isAdmin){
                            props.history.push("/");
                        }else{
                            if(option === false){
                                props.history.push("/");
                            }
                        }
                    }
                })
        }, [])

        return (
            <SpecificComponent {...props}/>
        )
    }

    return AuthenticationCheck;
}