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
    withStyles,
} from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    buttonBox: {
        margin: theme.spacing(1),
    },
    card: {
        margin: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
    },
    pageCard: {
        margin: theme.spacing(2),
        maxWidth: 1024,
    },
    pageBody: {
        margin: theme.spacing(2),
    },
    header: {
        margin: theme.spacing(2),
    },
}));
