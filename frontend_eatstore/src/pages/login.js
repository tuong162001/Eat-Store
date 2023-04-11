import React, { Component, useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import SignInForm from "../layouts/Components/SignInForm";
import SignUpForm from "../layouts/Components/SignUpForm";




export default function Login() {
    const [login, setLogin] = useState(true)

    const HandleClickSignIn = () => {
        setLogin(true)
    }
    const HandleClickRegister = () => {
        setLogin(false)
    }
    return (
        <>
            <div className="space-empty"></div>
            <div className='login-background'>
                <div className='login-container'>
                    <div className="pageSwitcher">
                        <a className="buttonSignIn"
                            onClick={HandleClickSignIn}
                        // activeClassName="pageSwitcherItem-active"
                        // className="pageSwitcherItem"
                        >
                            Sign In
                        </a>|
                        <a className="buttonSignUp"
                            onClick={HandleClickRegister}
                        // activeClassName="pageSwitcherItem-active"
                        // className="pageSwitcherItem"
                        >
                            Sign Up
                        </a>

                    </div>
                    {login ? <SignInForm /> : <SignUpForm />}
                </div>
            </div>
        </>
    );
}
