import {DateTime} from "luxon";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import React, {Fragment} from "react";
import {makeStyles} from "@mui/styles";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    dateTime: {
        fontSize: '18px',
        marginRight: '3px',
        marginTop: '10px',
        color: theme.colors.mainAccentColor,
    },
    memberContainer: {
        display: 'grid',
        gridTemplateColumns: '100px auto'
    }
}));

export default function EventList({events}) {

    const classes = useStyles();
    const navigate = useNavigate()


    const openEvent = eventId => {
        navigate(`/event/${eventId}`)
    }

    return (
        <Fragment>
            <h3>Events</h3>
            {
                events && events.map(event => {

                    const format = "yyyy-MM-dd'T'HH:mm:ss'Z'"
                    const evtTime = DateTime.fromFormat(event.time, format)

                    return <div key={event.id} onClick={() => openEvent(event.id)}>
                        <p>{event.team_1} V/s {event.team_2}
                            &nbsp;:&nbsp;
                            <CalendarMonthIcon className={classes.dateTime}/> {evtTime.toSQLDate()}
                            <QueryBuilderIcon className={classes.dateTime}/>{evtTime.toFormat('HH:mm')}
                        </p>
                    </div>
                })
            }
        </Fragment>
    )
}