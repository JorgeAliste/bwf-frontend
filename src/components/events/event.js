import React, {Fragment, useState, useEffect} from "react";
import {makeStyles} from "@mui/styles";
import {Link, useParams} from "react-router-dom";
import {useFetchEvent} from "../../hooks/fetch-event";
import {useAuth} from "../../hooks/useAuth";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import {DateTime} from "luxon";
import User from '../user/user';
import {Button, TextField} from "@mui/material";
import {placeBet} from "../../services/event-services";
import {toast} from 'react-toastify';

const useStyles = makeStyles(theme => ({
    dateTime: {
        fontSize: '18px',
        marginRight: '3px',
        marginTop: '10px',
        color: theme.colors.mainAccentColor,
    },
    bets: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        margin: '5px 0 0 0',
    }
}));

export default function Event() {

    const {authData} = useAuth()
    const classes = useStyles();
    const {id} = useParams();
    const [data, loading, error] = useFetchEvent(authData.token, id);
    const [event, setEvent] = useState(null);
    const [score1, setScore1] = useState(null);
    const [score2, setScore2] = useState(null);

    useEffect(() => {

        setEvent(data);
    }, [data])

    const sendBet = async () => {
        const bet = await placeBet(authData.token, {score1, score2, 'event': event.id})

        if (bet) {
            if (bet['new']) {
                event['event_bets'].push(bet['result'])
            } else {
                const myBetIndex = event['event_bets'].findIndex(oldBet => oldBet.user.id === bet['result'].user.id);
                event['event_bets'][myBetIndex] = bet['result']
            }
            toast.success(bet['message']);
        }
        setScore1('')
        setScore2('')

    }

    if (error) return <h1>Error</h1>
    if (loading) return <h1>Loading...</h1>

    const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
    const evtTime = event && DateTime.fromFormat(event.time, format);

    return (
        <Fragment>
            {event &&
                <Fragment>
                    < Link to={`/details/${event.group}`}>Back</Link>
                    <h3>{event.team_1} V/s {event.team_2}</h3>
                    {event.score_1 >= 0 && event.score_2 >= 0 && <h2>Score: {event.score_1} | {event.score_2}</h2>}

                    <h2>
                        <CalendarMonthIcon className={classes.dateTime}/> {evtTime.toSQLDate()}
                        <QueryBuilderIcon className={classes.dateTime}/>{evtTime.toFormat('HH:mm')}
                    </h2>
                    <hr/>
                    <br/>
                    {event && event.event_bets && event.event_bets.map(bet => {
                        return <div key={bet.id} className={classes.bets}>
                            <User user={bet.user}/>
                            <h4>{bet.score_1} : {bet.score_2}</h4>
                            <h4>PTS</h4>
                        </div>
                    })}
                    <hr/>
                    <br/>
                    <TextField label={"Score 1"} type={"number"} onChange={e => setScore1(e.target.value)}/>
                    <TextField label={"Score 2"} type={"number"} onChange={e => setScore2(e.target.value)}/>
                    <br/>
                    <Button variant={"contained"} color={"primary"} onClick={() => sendBet()}
                            disabled={!score1 || !score2}>Place bet</Button>

                </Fragment>
            }
        </Fragment>
    )
}