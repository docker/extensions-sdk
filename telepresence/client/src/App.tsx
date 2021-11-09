import React, { useState } from 'react';
import {
    Route,
    BrowserRouter,
    Switch,
    useLocation,
    Redirect,
    Link,
} from 'react-router-dom';
import { Button } from '@material-ui/core';

import { Home } from './Home';
import { ConnectPage } from './connect/Connect';
import { InterceptPage } from './intercepts/Intercept';
import { Header } from './header/Header';
import { Status } from './header/status';

export function App() {
    const [err, setErr] = React.useState('');
    const path = window.location.pathname;

    return (
        <Header sibling={Status}>
            <BrowserRouter>
                <Switch>
                    {err ? <Redirect to={'/error'} /> : null}
                    <Route exact path={path}>
                        {path == '/' ? (
                            <Home setErr={setErr} />
                        ) : (
                            <Redirect to="/" />
                        )}
                    </Route>
                    <Route exact path={'/'}>
                        <Home setErr={setErr} />
                    </Route>
                    <Route path={'/connect'}>
                        <ConnectPage setErr={setErr} />
                    </Route>
                    <Route path={'/intercepts'}>
                        <InterceptPage setErr={setErr} />
                    </Route>
                    <Route component={pageNotFound} />
                </Switch>
            </BrowserRouter>
        </Header>
    );
}

function pageNotFound() {
    return (
        <>
            <div>404, {useLocation().pathname} page not found</div>
            <Button component={Link} to={'/'} variant="outlined">
                Home
            </Button>
        </>
    );
}
