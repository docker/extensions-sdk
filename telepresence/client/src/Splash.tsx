import React, { useState } from 'react';
import { Link, useLocation, Redirect } from 'react-router-dom';

export type SplashProps = {
    activeStep: number;
};

export function Splash(props: SplashProps) {
    return (
        <>
            {props.activeStep == 2 ? (
                <Redirect to={'/intercepts'} />
            ) : (
                <Redirect to={'/connect'} />
            )}
        </>
    ); // add splash screen art?
}
