import React, { useState, useEffect } from 'react';
import { Link, useLocation, Redirect } from 'react-router-dom';
import {
    Button,
    Box,
    Grid,
    Card,
    CardActions,
    CardContent,
    FormControl,
    FormHelperText,
    Select,
    Step,
    Stepper,
    StepButton,
    Typography,
    MenuItem,
    Divider,
} from '@material-ui/core';

type StatusProps = {
    loggedIn: boolean;
    daemonStatus: boolean;
    activeStep: number;
};

export function StatusBar(props: any) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [daemonStatus, setDaemonStatus] = useState(false);
    const [activeStep, setActiveStep] = useState<number>(0);

    function getStatus() {
        /* 
        // gets cluster connectivity
        const kube = window.ddClient
            .execHostCmd('kubectl get nodes')
            .then((value: any) =>
                value.stdout.includes('Ready')
                    ? setClusterStatus(true)
                    : setClusterStatus(false),
            )
            .catch((err: Error) => console.log(err));
        */

        window.ddClient
            .execHostCmd('telepresence status')
            .then((value: any) => {
                const d =
                    value.stdout.includes('Root Daemon: Running') &&
                    value.stdout.includes('User Daemon: Running');
                const l = value.stdout.includes('Logged in');

                setDaemonStatus(d);
                setLoggedIn(l);

                l
                    ? d
                        ? setActiveStep(2)
                        : setActiveStep(1)
                    : setActiveStep(0);
            })
            .catch((err: Error) => console.log(err));
    }

    useEffect(() => {
        // getStatus every 5 seconds
        getStatus(); // runs at t=0
        const interval = setInterval(() => getStatus(), 5000); // runs at t=5x seconds where x > 0
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, []); // empty dep array -> runs once

    const steps = [
        { label: 'Log in', complete: loggedIn, page: '/connect' },
        {
            label: 'Open a Tunnel',
            complete: daemonStatus,
            page: '/connect',
        },
        { label: 'Intercept', complete: false, page: '/intercepts' },
    ];

    return (
        <>
            {activeStep == 2 ? (
                <Redirect to={'/intercepts'} from={'/connect'} />
            ) : (
                <Redirect to={'/connect'} from={'/intercepts'} />
            )}
            <Stepper activeStep={activeStep} style={{ minWidth: 512 }}>
                {steps.map((obj) => (
                    <Step key={obj.label} completed={obj.complete}>
                        <StepButton>{obj.label}</StepButton>
                    </Step>
                ))}
            </Stepper>
        </>
    );
}
