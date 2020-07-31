import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axiosCustom from '../../utils/axios';
import Task from '../task';
import './styles.scss';
import Modal from '../modal';
Tasks.propTypes = {
    userInfor: PropTypes.object,
};
Tasks.defaultProps = {
    userInfor: null,
};
const axios = axiosCustom();
function Tasks(props) {
    const { userInfor } = props;
    const [findText, setFindText] = useState('');
    const [tasks, setTasks] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const [taskModal, setTaskModal] = useState({});
    const clickEdit = (id) => {
        const index = tasks.findIndex((task) => task.id === id);
        if (index > -1) setTaskModal(tasks[index]);
        toggerModal();
    };
    const toggerModal = () => {
        setIsModal(!isModal);
    };
    const changeTask = (task) => {
        const id = tasks.findIndex((element) => element.id === task.id);
        if (id >= 0) {
            tasks[id] = task;
        } else {
            tasks.push(task);
        }
    };
    const renderModal = () => {
        return isModal ? (
            <div className='modal_box'>
                <Modal task={taskModal} clickHiddenModel={toggerModal} changeTask={changeTask} />
            </div>
        ) : (
            ''
        );
    };
    const clickDelete = (id) => {
        if (tasks) {
            const index = tasks.findIndex((task) => task.id === id);
            const newListTask = [...tasks];
            newListTask.splice(index, 1);
            setTasks(newListTask);
        }
    };
    function renderTask(props) {
        const { tasks } = props;
        if (tasks)
            return tasks.map((task, index) => (
                <Task key={index} task={task} clickEdit={clickEdit} clickDelete={clickDelete} />
            ));
        else return null;
    }
    useEffect(() => {
        async function getTask() {
            try {
                const result = await axios.callApi('get', 'http://localhost:8000/api/v1/gettask');
                if (result.status === 200) {
                    setTasks(result.data);
                }
            } catch (e) {
                console.error(e + '');
            }
        }
        getTask();
    }, []);
    const handerChangeText = (e) => {
        const { target } = e;
        setFindText(target.value);
        const filterTasks = tasks.filter(
            (task) => task.title.includes(findText) || task.description.includes(findText)
        );
        setTasks(filterTasks);
    };
    const handerClickAdd = () => {
        setTaskModal(null);
        toggerModal();
    };
    return (
        <>
            <div className='main_box'>
                <div className='block_header'>
                    <h1>Hi, Welcomeback!</h1>
                    <span>{userInfor ? userInfor.userName : ''} Todo list,</span>
                </div>
                <div className='card'>
                    <div className='nav'>
                        <div className='nav_menu'>
                            <ul className='nav_bar'>
                                <li className='nav-item active'>
                                    <Link className='nav-link' to='app-todo.html'>
                                        ToDo List
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='#'>
                                        Done
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='#'>
                                        Important
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='#'>
                                        Trash
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className='add_box'>
                            <button className='btn_add' onClick={handerClickAdd}>
                                Add Todo
                            </button>
                        </div>
                    </div>
                    <div className='findtask_box'>
                        <i className='fa fa-search' aria-hidden='true'></i>
                        <input
                            type='text'
                            className='inputText'
                            placeholder='Search task...'
                            value={findText}
                            onChange={handerChangeText}
                        />
                    </div>
                    <div className='body'>
                        <table className='table_tasks'>
                            <tbody>{renderTask({ tasks })}</tbody>
                        </table>
                    </div>
                </div>
            </div>
            {renderModal()}
        </>
    );
}

export default Tasks;
