import React, { useState } from "react";
import { Link, useLocation, Redirect } from "react-router-dom";
import { Button, Card, CardActions, CardContent, Typography, Divider} from "@material-ui/core";

import { cards } from "./ConnectCards";

export type CardProps = {
    title: string,
    body: string,
    button: string,
    buttonLink: string,
}

function makeCards(cards: CardProps[]) {
    return cards.map((cardProps) => makeCard(cardProps))
}


function makeCard(cardProps: CardProps) {
    const [connected, setConnected] = useState<boolean>(false);

    window.ddClient.execHostCmd(`telepresence status`)
    .then((value: any)=>{
        const userD = value.stdout.includes("User Daemon: Running")
        const rootD = value.stdout.includes("Root Daemon: Running")
        if (userD && rootD) {
            setConnected(true)
        }
    })

    return <div style={{padding:10}}>
        {connected ? <Redirect to="/intercepts" /> : null}
        <Card>
            <CardContent>
                <Typography variant={"h6"}>
                    {cardProps.title}
                </Typography>
                <Divider />
                <Typography>
                    {cardProps.body}
                </Typography>
            </CardContent>
            <CardActions>
                <Button component={Link} to={cardProps.buttonLink} variant="outlined">
                    {cardProps.button}
                </Button>
            </CardActions>
        </Card>
    </div>
}

export function Connect() {
    return <div style={{display: 'flex'}}>
        {makeCards(cards)}
        </div>
}