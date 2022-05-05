import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, TextField} from "@mui/material";
import {uploadAvatar} from "../../services/user-services";
import {useAuth} from "../../hooks/useAuth";

function Account() {

    const [image, setImage] = useState(null);
    const {authData} = useAuth();

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
