import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axiosCustom from '../../utils/axios';
import formatDate from '../../utils/date';
import './styles.scss';
const axios = axiosCustom();
Modal.propTypes = {
    task: PropTypes.object,
    clickHiddenModel: PropTypes.func,
    changeTask: PropTypes.func,
};
Modal.defaultProps = {
    task: null,
    clickHiddenModel: null,
    changeTask: null,
};

function Modal(props) {
    const { task, clickHiddenModel, changeTask } = props;
    const [title, setTitle] = useState(() => (task ? task.title : ''));
    const [description, setDescription] = useState(() => (task ? task.description : ''));
    const [timeStart, setTime] = useState(() =>
        task ? formatDate(new Date(task.timeStart)) : formatDate(new Date())
    );
    const handerClickCanel = () => {
        if (clickHiddenModel) {
            clickHiddenModel();
        }
    };
    const handerSubmit = async (e) => {
        e.preventDefault();
        const payload = { title, description, timeStart };
        if (task) {
            try {
                payload.id = task.id;
                const response = await axios
                    .callApi('patch', 'http://localhost:8000/api/v1/edittask', payload)
                    .catch((error) => console.error(error + ''));
                if (response.status === 200) {
                    console.log(response);
                    if (changeTask) changeTask(response.data);
                }
            } catch (error) {
                console.error(error + '');
            }
        } else {
            try {
                const response = await axios
                    .callApi('put', 'http://localhost:8000/api/v1/createtask', payload)
                    .catch((error) => console.error(error + ''));

                if (response.status === 201) {
                    console.log(response);
                    if (changeTask) changeTask(response.data);
                }
            } catch (error) {
                console.error(error + '');
            }
        }
        if (clickHiddenModel) {
            clickHiddenModel();
        }
    };
    const handerChange = (e) => {
        const { target } = e;
        switch (target.name) {
            case 'title':
                setTitle(target.value);
                break;
            case 'description':
                setDescription(target.value);
                break;
            case 'timeStart':
                setTime(target.value);
                break;
            default:
                break;
        }
    };
    return (
        <div className='Modal_box'>
            <form className='form_box' onSubmit={handerSubmit}>
                <div className='text_box'>
                    <label htmlFor='title'>Title</label>
                    <input
                        type='text'
                        name='title'
                        id='title'
                        value={title}
                        onChange={handerChange}
                    />
                </div>
                <div className='text_box'>
                    <label htmlFor='description'>Description</label>
                    <input
                        type='text'
                        name='description'
                        id='description'
                        value={description}
                        onChange={handerChange}
                    />
                </div>
                <div className='text_box'>
                    <label htmlFor='timeStart'>Time</label>
                    <input
                        type='datetime-local'
                        id='timeStart'
                        name='timeStart'
                        value={timeStart}
                        onChange={handerChange}
                    />
                </div>
            </form>
            <div className='btn_group_modal'>
                <button id='btn_cancel' onClick={handerClickCanel}>
                    Cancel
                </button>
                <button id='btn_success' onClick={handerSubmit}>
                    Success
                </button>
            </div>
        </div>
    );
}

export default Modal;
