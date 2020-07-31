import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import axiosCustom from '../../utils/axios';
import formatDate from '../../utils/date';
const axios = axiosCustom();
Task.propTypes = {
    task: PropTypes.object,
    clickEdit: PropTypes.func,
    clickDelete: PropTypes.func,
};
Task.defaultProps = {
    task: null,
    clickEdit: null,
    clickDelete: null,
};

function Task(props) {
    const { task, clickEdit, clickDelete } = props;
    const handerClickEdit = (id) => {
        if (clickEdit) {
            clickEdit(id);
        }
    };
    const handerClickDelete = async (id) => {
        try {
            const response = await axios
                .callApi('delete', `http://localhost:8000/api/v1/deletetask/${id}`)
                .catch((error) => console.error(error + ''));
            if (response.status === 200 && clickDelete) {
                clickDelete(id);
            }
        } catch (error) {
            console.error(error + '');
        }
    };
    const showStatus = (status) => {
        console.log(status);
        switch (status) {
            case 0:
                return 'Schedule';
            case 1:
                return 'Done';
            default:
                break;
        }
    };
    return task ? (
        <tr className='row'>
            <td className='column1'>
                <div className='task_box'>
                    <h2>Title: {task.title}</h2>
                    <p>Description: {task.description}</p>
                    <p>Time: {formatDate(new Date(task.timeStart))}</p>
                    <p>Status: {showStatus(task.status)}</p>
                </div>
            </td>
            <td className='column2'>
                <button className='btn_edit' onClick={() => handerClickEdit(task.id)}>
                    <i className='fa fa-pencil-square-o' aria-hidden='true'></i>
                </button>
                <button className='btn_cancel' onClick={() => handerClickDelete(task.id)}>
                    <i className='fa fa-trash-o' aria-hidden='true'></i>
                </button>
            </td>
        </tr>
    ) : null;
}

export default Task;
