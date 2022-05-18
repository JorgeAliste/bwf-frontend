import React, {Fragment, useState, useEffect} from "react";
import {makeStyles} from "@mui/styles";
import {Link, useParams} from "react-router-dom";
import {useFetchEvent} from "../../hooks/fetch-event";
import {useAuth} from "../../hooks/useAuth";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import {DateTime} from "luxon";
import User from '../user/user';
import {Button} from "@mui/material";
import {placeBet, setResults} from "../../services/event-services";
import {toast} from 'react-toastify';
import {CssTextField} from "../layout/elements";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const useStyles = makeStyles(theme => ({
    back: {
        float: "left",
        clear: "both"
    },
    container: {
        textAlign: "center",
    },
    dateTime: {
        fontSize: '18px',
        marginRight: '3px',
        marginLeft: '3px',
        marginTop: '10px',
        color: theme.palette.secondary.main,
    },
    bets: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        margin: '5px 0 0 0',
    },
    accent: {
        color: theme.palette.primary.main,
        fontSize: "30px"

    },
    numberField: {
        width: "120px",
    }
}));

export default function Event() {

    const {authData} = useAuth()
    const classes = useStyles();
    const {id} = useParams();
    const [data, loading, error] = useFetchEvent(authData.token, id);
    const [event, setEvent] = useState(null);
    const [evtTime, setEvtTime] = useState(null);
    const [isFuture, setIsFuture] = useState(null);
    const [timeDiff, setTimeDiff] = useState(null);
    const [score1, setScore1] = useState(null);
    const [score2, setScore2] = useState(null);

    useEffect(() => {
        setEvent(data);
        if (data?.time) {
            const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
            const eventTime = DateTime.fromFormat(data.time, format);
            setEvtTime(eventTime);
            const now = DateTime.now();
            setIsFuture(eventTime > now);
            setTimeDiff(eventTime.toRelative());
        }
    }, [data])

    const sendBet = async () => {
        const bet = await placeBet(authData.token, {score1, score2, 'event': event.id});

        if (bet) {
            if (bet['new']) {
                event['event_bets'].push(bet['result']);
            } else {
                const myBetIndex = event['event_bets'].findIndex(oldBet => oldBet.user.id === bet['result'].user.id);
                event['event_bets'][myBetIndex] = bet['result'];
            }
            toast.success(bet['message']);
        }
        setScore1('');
        setScore2('');
    }

    const setScores = async () => {
        const eventData = await setResults(authData.token, {score1, score2, 'event': event.id});

        if (eventData) {
            setEvent(eventData)
            toast.success("Scores has been set");
        } else {
            toast.error("Scores could not be set");

        }
        setScore1('');
        setScore2('');
    }

    if (error) return <h1>Error</h1>
    if (loading) return <h1>Loading...</h1>


    return (
        <div className={classes.container}>
            {event &&
                <Fragment>
                    < Link to={`/details/${event.group}`} className={classes.back}><ArrowBackIosIcon/></Link>
                    <h3>{event.team_1} <span className={classes.accent}>V/s</span> {event.team_2}</h3>
                    <h4>{timeDiff}</h4>
                    <h3>Total number of bets: {event.num_bets}</h3>
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
                            <h4>{bet.points}pts</h4>
                        </div>
                    })}
                    <hr/>
                    {isFuture ?
                        <Fragment>
                            <CssTextField label={"Score 1"} type={"number"} onChange={e => setScore1(e.target.value)}
                                          className={classes.numberField}/>
                            &nbsp;
                            <CssTextField label={"Score 2"} type={"number"} onChange={e => setScore2(e.target.value)}
                                          className={classes.numberField}/>
                            <br/><br/>
                            <Button variant={"contained"} color={"primary"} onClick={() => sendBet()}
                                    disabled={!score1 || !score2}>Place bet</Button>
                        </Fragment>

                        :
                        event['is_admin'] ?
                            <Fragment>
                                <CssTextField label={"Score 1"} type={"number"}
                                              onChange={e => setScore1(e.target.value)}
                                              className={classes.numberField}/>
                                &nbsp;
                                <CssTextField label={"Score 2"} type={"number"}
                                              onChange={e => setScore2(e.target.value)}
                                              className={classes.numberField}/>
                                <br/><br/>
                                <Button variant={"contained"} color={"primary"} onClick={() => setScores()}
                                        disabled={!score1 || !score2}>Set Scores</Button>
                            </Fragment> : null

                    }


                </Fragment>
            }
        </div>
    )
}