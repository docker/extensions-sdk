import React, { useState } from 'react';
import { Link, useLocation, Redirect } from 'react-router-dom';

type HomeProps = {
    setErr: React.Dispatch<React.SetStateAction<string>>;
};

export function Home(props: HomeProps) {
    const [desination, setDestination] = useState<string>();

    window.ddClient
        .execHostCmd(`telepresence status`)
        .then((value: any) => {
            const userD = value.stdout.includes('User Daemon: Running');
            const rootD = value.stdout.includes('Root Daemon: Running');
            if (userD && rootD) {
                setDestination('/intercepts');
            } else {
                setDestination('/connect');
            }
        })
        .catch((err: Error) => {
            console.log(err);
        });

    return <>{desination ? <Redirect to={desination} /> : null}</>;
}
