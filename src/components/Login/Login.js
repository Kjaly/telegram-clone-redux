import React from 'react';
import './Login.scss'
import {Button} from "@material-ui/core";
import {auth, provider} from "../../firebase";
const Login = () => {
    const signIn = () => {
        auth.signInWithPopup(provider).catch((error) => console.log(error.message))
    }
    return (
        <div className={'login'}>
            <div className="login__telegram">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/1024px-Telegram_logo.svg.png" alt=""/>
                <h1>Telegram</h1>
            </div>
            <Button className={'login__button'} onClick={signIn}>Sign In</Button>
        </div>
    );
};

export default Login;
