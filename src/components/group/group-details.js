import React, {useState, useEffect, Fragment} from 'react';
import {Link, useParams} from "react-router-dom";
import {useFetchGroup} from '../../hooks/fetch-group'
import {DateTime} from "luxon";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles(theme => ({
    dateTime: {
        fontSize: '18px',
        marginRight: '3px',
        marginTop: '10px',
        color: theme.colors.mainAccentColor,
    }
}));

function GroupDetails() {

    const classes = useStyles();

    const {id} = useParams();
    const [data, loading, error] = useFetchGroup(id);
    const [group, setGroup] = useState(null);

    useEffect(() => {
        setGroup(data)
    }, [data])

    if (error) return <h1>Error</h1>
    if (loading) return <h1>Loading...</h1>

    return (
        <div>
            < Link to={'/'}>Main Page</Link>
            {group &&
                <Fragment>
                    <h1>{group.name}</h1>
                    <p>Location: {group.location}</p>
                    <p>Description: {group.description}</p>

                    <h3>Events</h3>
                    {group.events.map(event => {

                        const format = "yyyy-MM-dd'T'HH:mm:ss'Z'"
                        const evtTime = DateTime.fromFormat(event.time, format)

                        return <div key={event.id}>
                            <p>{event.team_1} V/s {event.team_2} </p>
                            <p>
                                <CalendarMonthIcon className={classes.dateTime}/> {evtTime.toSQLDate()}
                                <QueryBuilderIcon className={classes.dateTime}/>{evtTime.toFormat('HH:mm')}
                            </p>
                        </div>
                    })}
                </Fragment>

            }
        </div>
    );
}

export default GroupDetails;
