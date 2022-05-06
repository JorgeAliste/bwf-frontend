import React from 'react';
import {Avatar} from "@mui/material";
import {makeStyles} from "@mui/styles";
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    container: {
        width: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
    },
    username: {
        padding: 0,
        margin: 0,
    }
});

export default function User({user}) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Avatar alt="user avatar" src={`${process.env.REACT_APP_API_URL}` + user.profile.image}/>
            <h4 className={classes.username}>{user.username}</h4>
        </div>
    );
};

User.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        profile: PropTypes.shape({
            image: PropTypes.string
        }).isRequired
    }).isRequired
}
