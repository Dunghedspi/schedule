import React from 'react';
import Tasks from '../../../components/tasks';
import DashBoard from '../../../components/DashBorad';
const routers = [
    {
        name: 'todolist',
        path: '/todolist',
        exact: false,
        component: (props) => <Tasks {...props} />,
    },
    {
        name: 'dashboard',
        path: '/',
        exact: false,
        component: (props) => <DashBoard {...props} />,
    },
];
export default routers;
