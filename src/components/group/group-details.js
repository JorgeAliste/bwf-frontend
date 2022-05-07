import React, {useState, useEffect, Fragment} from 'react';
import {Link, useParams} from "react-router-dom";
import {useFetchGroup} from '../../hooks/fetch-group'
import {DateTime} from "luxon";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import {makeStyles} from "@mui/styles";
import User from "../user/user";
import {Button} from "@mui/material";
import {joinGroup, leaveGroup} from "../../services/group-services";
import {useAuth} from "../../hooks/useAuth";


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

function GroupDetails() {

    const classes = useStyles();

    const {id} = useParams();
    const [data, loading, error] = useFetchGroup(id);
    const [group, setGroup] = useState(null);
    const [inGroup, setInGroup] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const {authData} = useAuth();

    useEffect(() => {
        if (data?.members) {
            if (authData?.user) {
                setInGroup(!!data.members.find(member => member.user.id === authData.user.id));
                setIsAdmin(data.members.find(member => member.user.id === authData.user.id)?.admin);
            }
        }

        setGroup(data);
    }, [data])

    const joinGroupButton = () => {
        joinGroup({user: authData.user.id, group: group.id}).then(resp => console.log(resp));
    }

    const leaveGroupButton = () => {
        leaveGroup({user: authData.user.id, group: group.id}).then(resp => console.log(resp));
    }

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

                    {inGroup ? <Button onClick={() => leaveGroupButton()} variant={"contained"} color={"primary"}>Leave
                            Group</Button> :
                        <Button onClick={() => joinGroupButton()} variant={"contained"} color={"primary"}>Join
                            Group</Button>
                    }


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

                    <h3>Members</h3>
                    {group.members.map(member => {

                        return <div key={member.id} className={classes.memberContainer}>
                            <User user={member.user}/>
                            <p>{member.points} pts.</p>
                        </div>
                    })}
                </Fragment>

            }
        </div>
    );
}

export default GroupDetails;
