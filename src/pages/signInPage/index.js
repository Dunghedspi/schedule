import React, { useState } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import axiosCustom from '../../utils/axios';
import './styles.scss';
const axios = axiosCustom();
function SignIn() {
    const history = useHistory();
    const [userName, setUserName] = useState(() => localStorage.getItem('userName') || '');
    const [password, setPassword] = useState('');
    const handerSubmit = async (e) => {
        e.preventDefault();
        if (userName && password) {
            try {
                const result = await axios.callApi(
                    'post',
                    'http://localhost:8000/api/v1/user/signin',
                    {
                        userName,
                        password,
                    }
                );
                if (result.status === 200) {
                    localStorage.setItem('token', 'beare ' + result.data);
                    localStorage.setItem('userName', userName);
                    history.push('/');
                }
            } catch (error) {
                console.error(error + '');
            }
        } else {
            console.log('chua nhap du thong tin');
        }
    };
    const handerChangeInput = (e) => {
        const { target } = e;
        if (target.name === 'userName') {
            setUserName(target.value);
        } else {
            setPassword(target.value);
        }
    };
    return localStorage.getItem('token') ? (
        <Redirect path='/'></Redirect>
    ) : (
        <div className='container'>
            <div className='signup-box'>
                <form onSubmit={handerSubmit}>
                    <h1>SIGN IN</h1>
                    <div className='text-box'>
                        <i className='fa fa-user' aria-hidden='true'></i>
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
                        <i className='fa fa-lock' aria-hidden='true'></i>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            value={password}
                            placeholder='Password'
                            onChange={handerChangeInput}
                        />
                    </div>
                    <input type='submit' value='Login' className='btn-submit' />
                </form>
                <Link to='/user/signup' children={'Create Acc'} />
            </div>
        </div>
    );
}

export default SignIn;
