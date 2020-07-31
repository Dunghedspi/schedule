import React from 'react';
import HomePage from '../../HomePage';
import SignIn from '../../signInPage';
import SignUp from '../../signUpPage';
const routes = [
    {
        name: 'signInPage',
        path: '/user/signin',
        exact: true,
        component: () => <SignIn />,
    },
    {
        name: 'signUpPage',
        path: '/user/signup',
        exact: true,
        component: () => <SignUp />,
    },
    {
        name: 'homePage',
        path: '/',
        exact: false,
        component: () => <HomePage />,
    },
];
export default routes;
