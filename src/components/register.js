import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Box, Button, TextField} from "@mui/material";
import {AccountCircle, VpnKey, Email} from "@mui/icons-material";
import {register} from "../services/user-services";

function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_2, setPassword_2] = useState('');

    const passMatch = () => {
        return password === password_2;
    };

    const handleRegisterSubmit = async evt => {
        evt.preventDefault();
        if (passMatch()) {
            const regData = await register({username, email, password, profile: {is_premium: false}})
            if (regData) {

            }
        } else {
            console.log("FAIL");
        }
    };

    return (
        <div>
            < Link to={'/'}>Main Page</Link>
            <h1>Register form</h1>
            <form onSubmit={handleRegisterSubmit}>
                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                    <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <TextField id="register-username" label="Username" variant="standard"
                               onChange={evt => setUsername(evt.target.value)}/>
                </Box>

                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                    <Email sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <TextField id="register-email" label="Email" variant="standard" type={"email"}
                               autoComplete="on"
                               onChange={evt => setEmail(evt.target.value)}/>
                </Box>

                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                    <VpnKey sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <TextField id="register-password" label="Password" variant="standard" type={"password"}
                               autoComplete="on"
                               onChange={evt => setPassword(evt.target.value)}/>
                </Box>

                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                    <VpnKey sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <TextField id="register-password-2" label="Repeat Password" variant="standard" type={"password"}
                               autoComplete="on"
                               onChange={evt => setPassword_2(evt.target.value)}/>
                </Box>

                <Button variant="contained" color="primary" type={"submit"}>
                    Register
                </Button>
            </form>
        </div>
    );
}

export default Register;
