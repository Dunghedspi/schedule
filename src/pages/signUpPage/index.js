import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axiosCustom from '../../utils/axios';
import './styles.scss';
const axios = axiosCustom();
function SignUp() {
    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [rePassword, setRePassword] = useState('');
    const handerChangeInput = (e) => {
        const { target } = e;
        switch (target.name) {
            case 'userName':
                setUserName(target.value);
                break;
            case 'password':
                setPassword(target.value);
                break;
            case 'email':
                setEmail(target.value);
                break;
            case 'repassword':
                setRePassword(target.value);
                break;
            default:
                break;
        }
    };
    const handerSubmit = async (e) => {
        e.preventDefault();
        if (userName && password && email && rePassword) {
            if (password !== rePassword) console.error('Xac nhan mat khau sai');
            else {
                try {
                    const result = await axios.callApi(
                        'post',
                        'http://localhost:8000/api/v1/user/signup',
                        {
                            userName,
                            password,
                            email,
                        }
                    );
                    if (result.status === 201) {
                        localStorage.setItem('userName', userName);
                        history.push('/user/signin');
                    }
                } catch (error) {
                    console.error(error + '');
                }
            }
        } else {
            console.log('chua nhap du thong tin');
        }
    };
    return (
        <div className='container'>
            <div className='signup-box'>
                <h1>SIGN UP</h1>
                <form onSubmit={handerSubmit}>
                    <div className='text-box'>
                        <label htmlFor='userName'>Username</label>
                        <input
                            type='text'
                            name='userName'
                            id='userName'
                            value={userName}
                            placeholder='Username'
                            onChange={handerChangeInput}
                        />
                    </div>
                    <div className='text-box'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='text'
                            name='email'
                            id='email'
                            value={email}
                            placeholder='abc@gmail.com'
                            onChange={handerChangeInput}
                        />
                    </div>
                    <div className='text-box'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            value={password}
                            placeholder='Password'
                            onChange={handerChangeInput}
                        />
                    </div>
                    <div className='text-box'>
                        <label htmlFor='repassword'>Re-Password</label>
                        <input
                            type='password'
                            name='repassword'
                            id='repassword'
                            value={rePassword}
                            placeholder='ComfrimPassword'
                            onChange={handerChangeInput}
                        />
                    </div>
                    <input type='submit' value='Sign Up' className='btn-submit' />
                </form>
                <Link to='/user/signin'>Sign In</Link>
            </div>
        </div>
    );
}

export default SignUp;
