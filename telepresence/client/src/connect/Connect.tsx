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
    Typography,
    MenuItem,
    Divider,
} from '@material-ui/core';

import { cards } from './ConnectCards';
import { RunLogCatch, RunAsRoot } from '../common/utils';
import { useStyles } from '../common/css';

export type CardProps = {
    title: string;
    body: string;
    button: string;
    buttonLink: string;
};

export type ConnectProps = {
    setErr: React.Dispatch<React.SetStateAction<string>>;
};

export function ConnectPage(props: ConnectProps) {
    const [open, setOpen] = React.useState(false);
    const [contexts, setContexts] = useState<string[]>([]);
    const [selectedContext, setSelectedContext] = useState<string>('');
    const classes = useStyles();

    useEffect(() => {
        getContexts();
    }, []);

    function getContexts() {
        window.ddClient
            .execHostCmd(`kubectl config get-contexts -o name`)
            .then((value: any) => {
                let ca = value.stdout.split('\n');
                console.log(ca);
                ca.pop(); // remove empty entry
                setContexts(ca);
            })
            .catch((err: Error) => {
                console.log(err);
            });

        window.ddClient
            .execHostCmd(`kubectl config current-context`)
            .then((value: any) => {
                let cc = value.stdout.trim();
                console.log(cc);
                setSelectedContext(cc);
            })
            .catch((err: Error) => {
                console.log(err);
            });
    }

    const handleChange = (event: any) => {
        RunLogCatch(`kubectl config use-context ${event.target.value}`);
        setSelectedContext(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    function makeCards(cards: CardProps[]) {
        return (
            <Grid container>
                {cards.map((cardProps) => makeCard(cardProps))}
            </Grid>
        );
    }

    function makeCard(cardProps: CardProps) {
        return (
            <Grid component={Card} className={classes.card} item xs>
                <CardContent>
                    <Typography variant={'h6'}>{cardProps.title}</Typography>
                    <Divider />
                    <Typography>{cardProps.body}</Typography>
                </CardContent>
                <CardActions>
                    <Button
                        component={Link}
                        to={cardProps.buttonLink}
                        variant="outlined"
                        onClick={() => RunAsRoot('telepresence connect')}
                    >
                        {cardProps.button}
                    </Button>
                </CardActions>
            </Grid>
        );
    }

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Typography>
                    Make changes to your service locally and see the results in
                    your cluster instantly, without waiting for containers to
                    build.
                </Typography>

                <FormControl className={classes.formControl}>
                    <Select
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={selectedContext}
                        onChange={handleChange}
                    >
                        {contexts.map((context) => {
                            return (
                                <MenuItem key={context} value={context}>
                                    {context}
                                </MenuItem>
                            );
                        })}
                    </Select>
                    <FormHelperText>
                        <Typography>Kubectl Current Context</Typography>
                    </FormHelperText>
                </FormControl>
            </div>
            <div style={{ display: 'flex' }}>{makeCards(cards)}</div>
        </>
    );
}
