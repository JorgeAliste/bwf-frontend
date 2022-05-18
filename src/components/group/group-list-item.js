import React from 'react';
import {Link} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import MapIcon from '@mui/icons-material/Map';
import PeopleIcon from '@mui/icons-material/People';

const useStyles = makeStyles(theme => ({
        container: {
            textAlign: "left",
            border: "2px solid #ffff",
            borderRadius: "1rem",
            padding: "0 1rem",
            display: "grid",
            gridTemplateColumns: "5fr auto",
            marginBottom: "1rem",
        },
        name: {
            color: theme.palette.primary.main
        },
    }))
;

function GroupListItem({group}) {

    const classes = useStyles();

    return (
        <div>
            {group &&
                <Link to={`/details/${group.id}`}>
                    <div className={classes.container}>

                        <h3><span className={classes.name}>{group.name}</span>: <MapIcon/>{group.location}</h3>
                        <h3><PeopleIcon/>{group['num_members']}</h3>
                        <p>{group.description}</p>

                    </div>
                </Link>
            }
        </div>
    );
}

export default GroupListItem;
