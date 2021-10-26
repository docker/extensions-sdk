import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
    makeStyles,
    InputLabel,
    TextField,
    MenuItem,
    FormControl,
    Select,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    card: {
        margin: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
}));

export function RunLogCatch(cmd: string) {
    window.ddClient
        .execHostCmd(cmd)
        .then((value: any) => console.log(value.stdout))
        .catch((err: Error) => console.log(err));
}
