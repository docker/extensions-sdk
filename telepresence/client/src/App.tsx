import React, { useState } from 'react';
import {
    Route,
    BrowserRouter,
    Switch,
    useLocation,
    Redirect,
} from 'react-router-dom';
import { Divider, Typography, Card, CardContent } from '@material-ui/core';

import { Home } from './Home';
import { Connect } from './Connect';
import { Intercepts } from './Intercept';
import { connected } from 'process';
import { Header } from './Header';

export function App(props: any) {
    const path = window.location.pathname;
    return (
        <Header>
            <BrowserRouter>
                <Switch>
                    <Route exact path={path}>
                        {path == '/' ? <Home /> : <Redirect to="/" />}
                    </Route>
                    <Route exact path={'/'} component={Home} />
                    <Route path={'/connect'} component={Connect} />
                    <Route path={'/intercepts'} component={Intercepts} />
                    <Route component={pageNotFound} />
                </Switch>
            </BrowserRouter>
        </Header>
    );
}

function pageNotFound() {
    return <div>404, {useLocation().pathname} page not found</div>;
}
