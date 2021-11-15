import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Button,
    Divider,
    Typography,
    makeStyles,
    InputLabel,
    TextField,
    MenuItem,
    FormControl,
    FormHelperText,
    Select,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@material-ui/core';

import { useStyles } from '../common/css';
import { StatusBar } from './StatusBar';

type HeaderProps = {
    loggedIn: boolean;
    daemonStatus: boolean;
    activeStep: number;
    children?: any;
};

export function Header(props: any) {
    const classes = useStyles();

    return (
        <Card className={classes.pageCard}>
            <div className={classes.header}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant={'h4'} color="textPrimary">
                        Telepresence
                    </Typography>
                    <StatusBar />
                </div>
                <Divider />
            </div>
            <div className={classes.pageBody}>{props.children}</div>
        </Card>
    );
}
