import React, { useState, useEffect } from 'react';
import {
    Route,
    BrowserRouter,
    Switch,
    useLocation,
    Redirect,
    Link,
} from 'react-router-dom';
import { Button } from '@material-ui/core';

import { Splash } from './Splash';
import { InterceptPage } from './intercepts/Intercept';
import { Header } from './header/Header';
import { Connect } from './setup/Connect';

export function App() {
    // get Tele binary path
    const path = window.location.pathname;
    const re = /\S+telepresence/;
    window.localStorage.setItem('binpath', `${path.match(re)}/host/`);
    console.log(`Tele bin path: ${window.localStorage.getItem('binpath')}`);

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

    return (
        <BrowserRouter>
            <Header>
                <Switch>
                    {console.log(window.location.pathname)}
                    <Route exact path={path} component={Splash} />
                    <Route path="/connect" component={Connect} />
                    <Route path="/intercepts" component={InterceptPage} />
                    <Route component={pageNotFound} />
                </Switch>
            </Header>
        </BrowserRouter>
    );
}
