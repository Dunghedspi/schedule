import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

DashBoard.propTypes = {
    userInfor: PropTypes.object,
};

function DashBoard(props) {
    const { userInfor } = props;
    const history = useHistory();
    const handerOnClick = () => {
        history.push('/todolist');
    };
    return (
        <div className='dashboard_box'>
            <div className='block_header'>
                <h1>Hi, Welcomeback!</h1>
                <span>{userInfor ? userInfor.userName : ''} Todo list,</span>
            </div>
            <div className='card'>
                <div className='card_header'>
                    <div className='btn_group'>
                        <button>Analytics</button>
                        <button className='actived'>Covid19</button>
                    </div>
                    <div className='dashboard'>
                        <button className='btn_todolist' onClick={handerOnClick}>
                            To do
                        </button>
                    </div>
                </div>
                <div className='card_body'>{/* <Covid19 /> */}</div>
            </div>
        </div>
    );
}

export default DashBoard;
