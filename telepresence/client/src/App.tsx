import React, { useState } from "react";
import { Route, BrowserRouter, Switch, useLocation, Redirect } from 'react-router-dom'
import { Divider, Typography, Card, CardContent } from "@material-ui/core";

import { Home } from "./Home";
import { Connect } from './Connect'
import { Intercepts } from './Intercept'
import { connected } from "process";


export function App() {
  const path = window.location.pathname
  return <>
    {header()}
    <BrowserRouter>
      <Switch>
        <Route exact path={path}>
          {path == "/" ? Home() : <Redirect to="/" />}
        </Route>
        <Route exact path={"/"} component={Home} />
        <Route path={"/connect"} component={Connect} />
        <Route path={"/intercepts"} component={Intercepts} />
        <Route component={pageNotFound} />
      </Switch>
    </BrowserRouter>
    </>
}

function pageNotFound() {
  return <div>404, {useLocation().pathname} page not found</div>
}

function header() {
  return <div style={{padding:10}}>
    <Card>
      <CardContent>
        <Typography variant={"h5"}>
          Telepresence
        </Typography>
        <Divider />
        <Typography>
          telepresence.io/docs/latest
        </Typography>
      </CardContent>
    </Card>
  </div>
}