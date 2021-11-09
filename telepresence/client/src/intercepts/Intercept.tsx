import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

import { RunLogCatch } from '../common/utils';
import { useStyles } from '../common/css';
// Telepersence intercept
export interface Intercept {
    Name: string;
    Intercepted: boolean;
    Port: string;
    Busy: boolean;
}

export type InterceptsProps = {
    setErr: Function;
};

export function InterceptPage(props: InterceptsProps) {
    const classes = useStyles();
    const [intercepts, setIntercepts] = useState<Intercept[]>([]);
    const [namespaces, setNamespaces] = useState<string[]>([]);
    const [selectedNamespace, setSelectedNamespace] =
        useState<string>('default');
    const [open, setOpen] = React.useState(false);
    const [filter, setFilter] = React.useState<string>('');
    const defaultPort = '8080:80';

    const handleChange = (event: any) => {
        listIntercepts(event.target.value);
        setSelectedNamespace(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        getNamespaces();
        listIntercepts(selectedNamespace);
    }, []); // Point Refresh here

    function getNamespaces() {
        window.ddClient
            .execHostCmd(
                `kubectl get namespaces --no-headers -o custom-columns=":metadata.name"`,
            ) // return just the names
            .then((value: any) => {
                let namespaces = value.stdout.split('\n');
                namespaces.pop(); // remove empty entry
                setNamespaces(namespaces);
            })
            .catch((err: Error) => {
                console.log(err);
            });
    }

    function listIntercepts(namespace: string) {
        if (namespace == '') {
            namespace = 'default';
        }

        console.log(
            `listing current intercepts (they could be intercepted or not)`,
        );

        window.ddClient
            .execHostCmd(`telepresence list -n ${namespace}`)
            .then(async (value: any) => {
                let intercepts: Intercept[] = [];
                let strs = value.stdout.split('\n');
                strs = strs?.filter((s: string) => !s.startsWith(' '));

                for (var i = 0; i < strs.length; i++) {
                    if (strs[i].length > 0) {
                        let line = strs[i].split(':');
                        let interceptName = line[0].trimEnd();
                        let intercepted = line[1]
                            .trimEnd()
                            .includes('intercepted');

                        const intercept: Intercept = {
                            Name: interceptName,
                            Intercepted: intercepted,
                            // TODO get intercepted port if already intercepted
                            // TODO make json flag for "tp list"
                            Port: defaultPort,
                            Busy: false,
                        };

                        intercepts.push(intercept);
                    }
                }

                setIntercepts(intercepts);
            })
            .catch((err: Error) => {
                console.log(err);
            });
    }

    function execIntercept(namespace: string, intercept: Intercept) {
        console.log(
            `intercepting ${intercept.Name} on port ${intercept.Port} on namespace ${namespace}`,
        );
        intercept.Busy = true;
        setIntercept(intercept);
        window.ddClient
            .execHostCmd(
                `telepresence intercept ${intercept.Name} --port ${intercept.Port} -n ${namespace}`,
            )
            .then((value: any) => {
                console.log(value.stdout);
                intercept.Intercepted = true;
                intercept.Busy = false;
                setIntercept(intercept);
            })
            .catch((err: Error) => {
                console.log(err);
            });
    }

    function execLeave(namespace: string, intercept: Intercept) {
        console.log(`stopping to intercept ${intercept.Name}}`);
        intercept.Busy = true;
        setIntercept(intercept);
        window.ddClient
            .execHostCmd(`telepresence leave ${intercept.Name}-${namespace}`)
            .then((value: any) => {
                console.log(value.stdout);
                intercept.Intercepted = false;
                intercept.Busy = false;
                setIntercept(intercept);
            })
            .catch((err: Error) => {
                console.log(err);
            });
    }

    function getIntercept(intercept: Intercept) {
        return intercepts.find((i) => i.Name == intercept.Name);
    }

    function setIntercept(intercept: Intercept) {
        let updatedIntercepts = intercepts.map((i) => {
            if (i.Name == intercept.Name) {
                i.Port = intercept.Port;
                i.Intercepted = intercept.Intercepted;
                i.Busy = intercept.Busy;
            }
            return i;
        });

        setIntercepts(updatedIntercepts);
    }

    function renderIntercepts(ia: Intercept[]) {
        return ia.map((i: Intercept) => renderIntercept(i));
    }

    function renderFilteredIntercepts(ia: Intercept[]) {
        if (filter != '') {
            return renderIntercepts(
                ia.filter((i: Intercept) => i.Name.includes(filter)),
            );
        }
        return renderIntercepts(ia);
    }

    function renderIntercept(intercept: Intercept) {
        return (
            <TableRow>
                <TableCell>{intercept.Name}</TableCell>
                <TableCell>
                    <TextField
                        disabled={intercept.Intercepted}
                        label="Port"
                        defaultValue={defaultPort}
                        onChange={(e) => {
                            intercept.Port = e.target.value;
                            setIntercept(intercept);
                        }}
                    />
                </TableCell>
                <TableCell>
                    <Button
                        variant="outlined"
                        onClick={() =>
                            intercept.Intercepted
                                ? execLeave(selectedNamespace, intercept)
                                : execIntercept(selectedNamespace, intercept)
                        }
                        disabled={getIntercept(intercept)?.Busy}
                    >
                        {intercept.Intercepted ? 'Leave' : 'Intercept'}
                    </Button>
                </TableCell>
            </TableRow>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormControl className={classes.formControl}>
                    <Select
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={selectedNamespace}
                        onChange={handleChange}
                    >
                        {namespaces.map((namespace) => {
                            return (
                                <MenuItem key={namespace} value={namespace}>
                                    {namespace}
                                </MenuItem>
                            );
                        })}
                    </Select>
                    <FormHelperText>
                        <Typography>Kubernetes Namespace</Typography>
                    </FormHelperText>
                </FormControl>

                <div style={{ display: 'flex' }}>
                    <div className={classes.buttonBox}>
                        <Button component={Link} to={'/'} variant="outlined">
                            Refresh
                        </Button>
                    </div>
                    <div className={classes.buttonBox}>
                        <Button
                            component={Link}
                            to={'/connect'}
                            variant="outlined"
                            onClick={() => {
                                RunLogCatch('telepresence quit');
                            }}
                        >
                            Quit
                        </Button>
                    </div>
                    <div className={classes.buttonBox}>
                        <Button
                            component={Link}
                            to={'/connect'}
                            variant="outlined"
                        >
                            Uninstall
                        </Button>
                    </div>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant={'h6'}>Name</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant={'h6'}>
                                    Port {'<local-port>[:<remote-port>]'.sub()}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <TextField
                                    label="Search"
                                    onChange={(e) => setFilter(e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderFilteredIntercepts(intercepts)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
