// import { createBrowserHistory } from "history";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Apis, { endpoints } from "../../configs/Apis";
import "./styleLogin.css";

export default function SignUpForm() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [isShowPass, setIsShowPass] = useState(true)
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const [error1, setError1] = useState(false)
    


    const handleRegister = (event) => {
        event.preventDefault()
        let registerUser = async () => {
            const formData = new FormData()
            formData.append("first_name", firstName)
            formData.append("last_name", LastName)
            formData.append("username", username)
            formData.append("password", password)
            formData.append("email", email)

            try {
                let res = await Apis.post(endpoints['register'], formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then(response => {
                    console.log(response)
                    if (response.status === 201) {
                        window.location.reload()
                    }
                }).catch((err) => {
                    if (err.response) {
                        alert(Object.keys(err.response.data)[0] + 'Đã có người đăng kí');
                    }
                })


            } catch (error) {
                console.log(error)
            }

        }
        if (password !== null && password === confirmPassword) {
            registerUser()
            // setTimeout(() => {
            //     // alert("Đăng kí thành công")
            //     // window.location.reload()
            //     // navigate("/login")

            // }, 1000);
        } else {
            alert('password error')
        }
    }


    return (
        <>
            <form className="form" onSubmit={handleRegister} >
                <div className='col-12 form-group input-login'>
                    <label>Họ</label>
                    <input className='form-control' type='text'
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                </div>
                <div className='col-12 form-group input-login'>
                    <label>Tên</label>
                    <input className='form-control' type='text'
                        value={LastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                </div>
                <div className='col-12 form-group input-login'>
                    <label>Tên tài khoản</label>
                    <input className='form-control' type='text'
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className='col-12 form-group input-login'>
                    <label>Mật khẩu</label>

                    <div className='custom-input-password'>
                        <input className='form-control'
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        {/* <span >
                            <i className={!isShowPass ? "far fa-eye" : "far fa-eye-slash"}></i>
                        </span> */}

                    </div>
                </div>
                <div className='col-12 form-group input-login'>
                    <label>Xác nhận mật khẩu</label>

                    <div className='custom-input-password'>
                        <input className='form-control'
                            type="password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                        {/* <span >
                            <i className={!isShowPass ? "far fa-eye" : "far fa-eye-slash"}></i>
                        </span> */}

                    </div>
                </div>
                <div className='col-12 form-group input-login'>
                    <label>Email</label>

                    <div className='custom-input-password'>
                        <input className='form-control'
                            type={isShowPass ? 'text' : 'password'}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <span >
                            <i className={!isShowPass ? "far fa-eye" : "far fa-eye-slash"}></i>
                        </span>

                    </div>
                </div>

                <div className='col-12'>
                    <button className='btn-login'>Đăng ký</button>
                </div>

                <div className='col-12'>
                    <span>Bạn đã có tài khoản?</span>
                </div>

            </form>
        </>
    );
}
