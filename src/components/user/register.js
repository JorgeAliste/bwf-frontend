import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Box, Button, TextField} from "@mui/material";
import {AccountCircle, VpnKey, Email} from "@mui/icons-material";
import {auth, register} from "../../services/user-services";
import {useAuth} from "../../hooks/useAuth";

function Register() {

    const {setAuth} = useAuth()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_2, setPassword_2] = useState('');
    const navigate = useNavigate();

    const passMatch = () => {
        return password === password_2;
    };

    const handleRegisterSubmit = async evt => {
        evt.preventDefault();
        if (passMatch()) {
            const regData = await register({username, email, password, profile: {is_premium: false}})
            if (regData) {
                const data = await auth({username, password});
                setAuth(data);
                navigate('/account')
            }
        } else {
            console.log("Password does not match");
        }
    };

    return (
        <div>
            < Link to={'/'}>Main Page</Link>
            <h1>Register</h1>
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
