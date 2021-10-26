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

export function Header(props: any) {
    return (
        <div style={{ padding: 16, maxWidth: 1024 }}>
            <Card>
                <div style={{ padding: 16 }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                        }}
                    >
                        <Typography variant={'h5'}>Telepresence</Typography>
                        <Typography>telepresence.io/docs/latest</Typography>
                    </div>
                    <Divider />
                    {props.children}
                </div>
            </Card>
        </div>
    );
}
