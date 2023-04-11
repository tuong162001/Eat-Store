import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Apis, { endpoints } from "../../configs/Apis";
import { loginUser } from "../../store/actionReducer/user";
import "./styleLogin.css";
import cookie from "react-cookies";

export default function SignInForm() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPass, setIsShowPass] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            let info = await Apis.get(endpoints['oauth2-info'])
            let res = await Apis.post(endpoints['login'], {
                "client_id": info.data.client_id,
                "client_secret": info.data.client_secret,
                "username": username,
                "password": password,
                "grant_type": "password"
            }).catch((err) => {
                if (err.response) {
                    // alert(Object.keys(err.response.data)[0] + 'Đã có người đăng kí');
                    alert("Tài khoản mật khẩu sai hoặc chưa được kích hoạt!!!")
                }
            })

            cookie.save("access_token", res.data.access_token)
            // console.log('Authorization', `Bearer ${cookie.load('access_token')}`);
            let user = await Apis.get(endpoints['current-user'], {
                headers: {
                    'Authorization': `Bearer ${cookie.load('access_token')}`
                }
            })


            cookie.save('user', JSON.stringify(user.data))
            dispatch(loginUser(user.data))
            navigate("/shopping-card")


        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>
            <form className="form" onSubmit={handleLogin}>
                <div className='col-12 form-group input-login'>
                    <label>Tên tài khoản</label>
                    <input className='form-control' placeholder='' type='text'
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className='col-12 form-group input-login'>
                    <label>Mật khẩu</label>

                    <div className='custom-input-password'>
                        <input className='form-control' placeholder=''
                            type={isShowPass ? 'text' : 'password'}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <span >
                            <i className={!isShowPass ? "far fa-eye" : "far fa-eye-slash"}></i>
                        </span>

                    </div>
                </div>
                <div className='col-12'>
                    <button className='btn-login'>Đăng nhập</button>
                </div>

                <div className='col-12'>
                    <span>Bạn đã quên mật khẩu?</span>
                </div>
                <div className='col-12 text-center  mt-4'>
                    <span className='login-orther'>Đăng nhập với:</span>
                </div>
            </form>
        </>
    );
}
