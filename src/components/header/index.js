import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

function Header(props) {
    const [isToggerUser, setIsToggerUser] = useState(false);
    const toggerUser = () => {
        setIsToggerUser(!isToggerUser);
    };
    const handerClickLogout = () => {
        localStorage.removeItem('token');
    };
    return (
        <div className='headerContainer'>
            <div className='search-box'>
                <form id='navbar-search' className='navbar-form search-form'>
                    <button type='button' className='btn btn-default btn-search'>
                        <i className='fa fa-search' aria-hidden='true'></i>
                    </button>
                    <input
                        //value=''
                        className='form-control'
                        placeholder='Search here...'
                        type='text'
                    />
                </form>
            </div>
            <div className='navbar-menu'>
                <ul className='navbar-nav'>
                    <li>
                        <i className='fa fa-comments-o' aria-hidden='true'></i>
                    </li>
                    <li className='usericon' onClick={toggerUser}>
                        <i className='fa fa-user-o' aria-hidden='true'></i>
                        {isToggerUser ? (
                            localStorage.getItem('token') ? (
                                <div className='dropdown_user'>
                                    <Link to='/user/signin' onClick={handerClickLogout}>
                                        Log Out
                                    </Link>
                                </div>
                            ) : (
                                <div className='dropdown_user'>
                                    <Link to='/user/signin'>Sign In</Link>
                                    <Link to='/user/signup'>Sign Up</Link>
                                </div>
                            )
                        ) : (
                            ''
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header;
