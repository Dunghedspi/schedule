import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { Link } from 'react-router-dom';
SideBar.propTypes = {
    userInfor: PropTypes.object,
};
SideBar.defaultProps = {
    userInfor: null,
};
function SideBar(props) {
    const { userInfor } = props;
    console.log(userInfor);
    return (
        <div className='sideBarContainer'>
            <div className='logo-box'>
                <Link to='*'>
                    <img src='./icon.svg' alt='logo' />
                    <h2>Conan</h2>
                </Link>
            </div>
            <div className='user-account'>
                <div className='user'>
                    <img src='./user.png' className='userImage' alt='userImage' />
                </div>
                <div className='dropmenu'>
                    <span style={{ color: '#999999' }}>Welcome</span>
                    <strong style={{ color: '#777777' }}>
                        {userInfor ? userInfor.userName : ''}
                    </strong>
                </div>
            </div>
            <div className='mainmenu'>
                <ul className='menu'>
                    <li className='conan'>conan</li>
                    <li>
                        <Link to='/'>DashBoard</Link>
                        <i className='fa fa-tachometer' aria-hidden='true'></i>
                    </li>
                    <li>
                        <Link to='/todolist'>Todolist</Link>
                        <i className='fa fa-list' aria-hidden='true'></i>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;
