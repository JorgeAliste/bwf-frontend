import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, TextField} from "@mui/material";
// import {Box, Button, TextField} from "@mui/material";
// import {AccountCircle, VpnKey, Email} from "@mui/icons-material";
// import {register} from "../../services/user-services";
import {uploadAvatar} from "../../services/user-services";
import {useAuth} from "../../hooks/useAuth";

function Account() {

    // const [username, setUsername] = useState('');
    const [image, setImage] = useState(null);
    const {authData} = useAuth();
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [password_2, setPassword_2] = useState('');

    // const passMatch = () => {
    //     return password === password_2;
    // };

    const uploadFile = async evt => {
        evt.preventDefault();
        const uploadData = new FormData();
        uploadData.append('image', image, image.name)

        await uploadAvatar(authData.user.profile.id, uploadData)

    };

    return (
        <div>
            < Link to={'/'}>Main Page</Link>
            <h1>Account</h1>
            <form onSubmit={uploadFile}>
                <label>
                    <p>Upload your avatar</p>
                </label>
                <TextField type={"file"} onChange={evt => setImage(evt.target.files[0])}/>
                <Button type={"submit"} variant={"contained"} color={"primary"}>Upload File</Button>

            </form>
        </div>
    );
}

export default Account;
