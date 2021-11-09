import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import {
    CancelOutlined,
    CheckCircleOutline,
    Check,
    Clear,
} from '@material-ui/icons';

export type StatusProps = {
    label: string;
    status: Boolean;
};

export function Status() {
    const [clusterStatus, setClusterStatus] = useState(false);
    const [userDStatus, setUserDStatus] = useState(false);
    const [rootDStatus, setRootDStatus] = useState(false);

    const statusArray: StatusProps[] = [
        { label: 'Cluster Connectivity', status: clusterStatus },
        { label: 'Root Daemon', status: userDStatus },
        { label: 'User Daemon', status: rootDStatus },
    ];

    function getStatus() {
        window.ddClient
            .execHostCmd('kubectl get nodes')
            .then((value: any) =>
                value.stdout.includes('Ready')
                    ? setClusterStatus(true)
                    : setClusterStatus(false),
            )
            .catch((err: Error) => console.log(err));
    }

    useEffect(() => {
        getStatus(); // runs at t=0
        const interval = setInterval(() => getStatus(), 5000); // runs at t=5x seconds where x > 0
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, []);

    function renderStatus(statusProps: StatusProps) {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>{statusProps.label}</Typography>
                {statusProps.status ? (
                    <Check style={{ fill: 'green' }} />
                ) : (
                    <Clear style={{ fill: 'red' }} />
                )}
            </div>
        );
    }

    function renderStatusArray(statusPropArray: StatusProps[]) {
        return statusPropArray.map((statusProps) => {
            return renderStatus(statusProps);
        });
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {renderStatusArray(statusArray)}
        </div>
    );
}
