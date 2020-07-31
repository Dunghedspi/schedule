import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import routers from '../routers/pathPages';
import PageNotExited from '../PageNotExited';
function renderRoutePath(props) {
    const { routers } = props;

    return routers.map((router, id) => (
        <Route key={id} path={router.path} exact={router.exact} component={router.component} />
    ));
}
function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <Switch>
                    {renderRoutePath({ routers })}
                    <Route path='*' component={() => <PageNotExited />} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
