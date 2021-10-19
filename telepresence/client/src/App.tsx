import React from "react";
import { Route, BrowserRouter, Switch, useLocation } from 'react-router-dom'
import { Divider, Typography, Card, CardContent } from "@material-ui/core";

import { Connect } from './Connect'
import { Intercept } from './Intercept'


export function App() {
  const path = window.location.pathname
  return <>
    {header()}
    <BrowserRouter>
    <Switch>
        <Route exact path={path} component={Connect} />
        <Route path={"/intercepts"} component={Intercept} />
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
        <Typography variant={"h6"}>
          Telepresence
        </Typography>
        <Divider />
      </ CardContent>
    </ Card>
  </div>
}