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

import { RunLogCatch, RunAsRoot } from '../common/utils';
import { useStyles } from '../common/css';
