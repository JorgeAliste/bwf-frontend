import React, {useState} from 'react';
import {Link} from 'react-router-dom';
// import {Box, Button, TextField} from "@mui/material";
// import {AccountCircle, VpnKey, Email} from "@mui/icons-material";
// import {register} from "../../services/user-services";

function Account() {

    const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [password_2, setPassword_2] = useState('');

    // const passMatch = () => {
    //     return password === password_2;
    // };

    const handleSubmit = async evt => {
        evt.preventDefault();

    };

    return (
        <div>
            < Link to={'/'}>Main Page</Link>
            <h1>Account</h1>
        </div>
    );
}

export default Account;
