import React, { useEffect, useState } from 'react';
import SideBar from '../../components/sideBar';
import Header from '../../components/header';
import './styles.scss';
import routers from '../routers/comom';
import { Route, Switch } from 'react-router-dom';
import axiosCustom from '../../utils/axios';
const axios = axiosCustom();

function HomePage(props) {
    const [userInfor, setUserInfor] = useState(() => {});
    useEffect(() => {
        const getInforUser = async () => {
            const response = await axios
                .callApi('get', 'http://localhost:8000/api/v1/user/getinfor')
                .catch((error) => console.error(error + ''));
            if (response.status === 200) {
                setUserInfor(response.data);
            }
        };
        getInforUser();
    }, []);
    function renderChildHome(props) {
        const { routers } = props;
        return routers.map((router, index) => (
            <Route
                key={index}
                path={router.path}
                exact={router.exact}
                component={() => router.component({ userInfor })}
            />
        ));
    }
    return (
        <div className='root'>
            <div className='sidebar'>
                <SideBar userInfor={userInfor} />
            </div>
            <div className='header'>
                <Header />
                <Switch>{renderChildHome({ routers })}</Switch>
            </div>
        </div>
    );
}

export default HomePage;
