import React, {Fragment, useState} from 'react';
import {Box, Button, TextField} from "@mui/material";
import {AccountCircle, VpnKey} from "@mui/icons-material";
import {auth} from '../../services/user-services'
import {useAuth} from "../../hooks/useAuth";
import {Link, useNavigate} from "react-router-dom";
import User from "../user/user";


function Sidebar() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {authData, setAuth} = useAuth();
    const navigate = useNavigate()

    const handleLoginSubmit = async evt => {
        evt.preventDefault();
        const data = await auth({username, password});
        setAuth(data);

    }

    const logout = () => {
        setAuth(null);
    }
    const account = () => {
        navigate('/account')
    }

    return (

        <div className={"sidebar"}>
            {!authData ?
                <Fragment>
                    <form onSubmit={handleLoginSubmit}>
                        <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                            <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                            <TextField id="input-username" label="Username" variant="standard"
                                       onChange={evt => setUsername(evt.target.value)}/>
                        </Box>

                        <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                            <VpnKey sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                            <TextField id="input-password" label="Password" variant="standard" type={"password"}
                                       autoComplete="on"
                                       onChange={evt => setPassword(evt.target.value)}/>
                        </Box>

                        <Button variant="contained" color="primary" type={"submit"}>
                            Login
                        </Button>

                    </form>
                    <p><Link to={'/register'}> Register here!</Link></p>
                </Fragment> :
                <div>
                    <User user={authData.user}/>
                    <p>
                        <Button variant="contained" color="primary" onClick={() => account()}>
                            My Account
                        </Button>
                    </p>
                    <p>
                        <Button variant="contained" color="primary" onClick={() => logout()}>
                            Logout
                        </Button>
                    </p>

                </div>
            }
        </div>


    );
}

export default Sidebar;
