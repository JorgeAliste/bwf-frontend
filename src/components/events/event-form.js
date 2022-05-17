import React, {useState} from "react";
import {useNavigate, useLocation, Link} from "react-router-dom";
import {CssTextField} from "../layout/elements";
import {Button} from "@mui/material";
import {DateTime as Datetime} from "luxon";
import {createEvent} from "../../services/event-services";
import {useAuth} from "../../hooks/useAuth";
import {toast} from 'react-toastify';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function EventForm() {

    const {authData} = useAuth();
    const {state} = useLocation();
    const {group} = state;
    const [team1, setTeam1] = useState();
    const [team2, setTeam2] = useState();
    const [time, setTime] = useState();
    const navigate = useNavigate()


    const handleSubmit = async e => {
        e.preventDefault();
        const format = "yyyy-MM-dd'T'HH:mm";
        const utcTime = Datetime.fromFormat(time, format).toUTC().toFormat(format);

        const eventData = await createEvent(authData.token, {
            'team_1': team1,
            'team_2': team2,
            'time': utcTime,
            'group': group.id
        });

        if (eventData) {
            toast.success("Event created!");
            navigate(`/details/${group.id}`)
        } else {
            toast.error("Error creating event");
        }
    }

    return (
        <div>
            < Link to={`/details/${group.id}`}><ArrowBackIosIcon/></Link>

            <h1>
                New Event for {group.name}
            </h1>
            <form onSubmit={handleSubmit}>
                <CssTextField label="Team 1" onChange={evt => setTeam1(evt.target.value)}/>
                <CssTextField label="Team 2" onChange={evt => setTeam2(evt.target.value)}/>
                <br/><br/>
                <CssTextField
                    label={"Date and time of event"}
                    type={'datetime-local'}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={evt => setTime(evt.target.value)}
                />
                <br/>
                <br/>
                <Button variant={"contained"} color={"primary"} type={"submit"}>Create Event</Button>
            </form>
        </div>

    )
}
