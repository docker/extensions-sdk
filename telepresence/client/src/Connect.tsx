import React from "react";
import { Link, useLocation } from "react-router-dom";
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
    return <div style={{padding:10}}>
        <Card>
            <CardContent>
                <Typography>
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