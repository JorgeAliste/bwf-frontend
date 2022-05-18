import React, {useState, useEffect, Fragment} from 'react';
import {Link, useParams} from "react-router-dom";
import {useFetchGroup} from '../../hooks/fetch-group'
import {makeStyles} from "@mui/styles";
import User from "../user/user";
import {Button} from "@mui/material";
import {joinGroup, leaveGroup} from "../../services/group-services";
import {useAuth} from "../../hooks/useAuth";
import Comments from "../comments/comments";
import EventList from "../events/event-list";
import {useNavigate} from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const useStyles = makeStyles(theme => ({
    dateTime: {
        fontSize: '18px',
        marginRight: '3px',
        marginTop: '10px',
        color: theme.colors.mainAccentColor,
    },
    memberContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        alignItems: "center"
    },
    gold: {
        color: "gold",
    },
    silver: {
        color: "silver",
    },
    bronze: {
        color: "bronze",
    },
}));

function GroupDetails() {

    const classes = useStyles();

    const {id} = useParams();
    const [data, loading, error] = useFetchGroup(id);
    const [group, setGroup] = useState(null);
    const [inGroup, setInGroup] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const {authData} = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        if (data?.members) {

            data.members.sort((a, b) => b.points - a.points);

            const availableTrophies = ['gold', 'silver', 'bronze'];
            let currentTrophy = 0;
            data.members.map((m, index) => {
                if (index === 0) {
                    m.trophy = availableTrophies[currentTrophy];
                } else {
                    if (m.points !== data.members[index - 1].points) {
                        currentTrophy++;
                    }

                    if (currentTrophy < availableTrophies.length) {
                        m.trophy = availableTrophies[currentTrophy];
                    }
                }

            })

            if (authData?.user) {
                setInGroup(!!data.members.find(member => member.user.id === authData.user.id));
                setIsAdmin(data.members.find(member => member.user.id === authData.user.id)?.admin);
            }
        }

        setGroup(data);
    }, [data, authData])

    const joinGroupButton = () => {
        joinGroup({user: authData.user.id, group: group.id}).then(resp => console.log(resp));
    }

    const leaveGroupButton = () => {
        leaveGroup({user: authData.user.id, group: group.id}).then(resp => console.log(resp));
    }

    const addEvent = () => {
        navigate('/event-form', {state: {group}});
    }

    if (error) return <h1>Error</h1>
    if (loading) return <h1>Loading...</h1>

    return (
        <div>
            < Link to={'/'}><ArrowBackIosIcon/></Link>
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
                    {isAdmin && <Button onClick={() => addEvent()} variant={"contained"} color={"primary"}>Add New
                        Event</Button>}


                    <EventList events={group.events}/>

                    <h3>Members</h3>
                    {group.members.map(member => {

                        return <div key={member.id} className={classes.memberContainer}>
                            <User user={member.user}/>
                            <p><EmojiEventsIcon className={classes[member.trophy]}/></p>
                            <p>{member.points} pts.</p>
                        </div>
                    })}
                    <Comments group={group}/>
                </Fragment>

            }
        </div>
    );
}

export default GroupDetails;
