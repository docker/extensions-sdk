import React, { useState, useEffect } from 'react';
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
    Typography,
    MenuItem,
    Divider,
} from '@material-ui/core';

import { RunLogCatch, RunAsRoot } from '../common/utils';
import { useStyles } from '../common/css';

const loginCards: CardProps[] = [
    {
        title: 'Login to Ambassador Cloud',
        body: 'Login to ambassador cloud to explore all our great features.',
        buttonLabel: 'Open Browser',
        buttonOnClick: () => RunLogCatch('telepresence login'),
    },
];

export type CardProps = {
    title: string;
    body: string;
    buttonLabel: string;
    buttonOnClick: () => void;
};

export function Cards(props: CardProps[]) {
    const classes = useStyles();

    function makeCard(cardProps: CardProps) {
        return (
            <Grid item xs>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant={'h6'}>
                            {cardProps.title}
                        </Typography>
                        <Divider />
                        <Typography>{cardProps.body}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="outlined"
                            onClick={cardProps.buttonOnClick}
                        >
                            {cardProps.buttonLabel}
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    }

    return (
        <Grid container spacing={2}>
            {props.map((cardProps) => makeCard(cardProps))}
        </Grid>
    );
}
