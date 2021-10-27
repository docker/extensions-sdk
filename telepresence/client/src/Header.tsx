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

import { useStyles } from './css';

export function Header(props: any) {
    const classes = useStyles();

    return (
        <Card className={classes.pageCard}>
            <div className={classes.header}>
                <div className={classes.title}>
                    <Typography variant={'h5'} color="textPrimary">
                        Telepresence
                    </Typography>
                    <Typography>telepresence.io/docs/latest</Typography>
                </div>
                <Divider />
            </div>
            <div className={classes.pageBody}>{props.children}</div>
        </Card>
    );
}
