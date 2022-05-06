import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Box, Button, TextField} from "@mui/material";
import {changePassword, uploadAvatar} from "../../services/user-services";
import {useAuth} from "../../hooks/useAuth";
import {VpnKey} from "@mui/icons-material";
import {toast} from 'react-toastify';

function Account() {

    const [image, setImage] = useState(null);
    const {authData} = useAuth();

    const [oldPassword, setOldPassword] = useState(null);
    const [newPassword1, setNewPassword1] = useState(null);
    const [newPassword2, setNewPassword2] = useState(null);

    const passMatch = () => {
        return newPassword1 === newPassword2;
    }

    const uploadFile = async evt => {
        evt.preventDefault();
        const uploadData = new FormData();
        uploadData.append('image', image, image.name);

        const uploadDataResponse = await uploadAvatar(authData.user.profile.id, uploadData);

        if (uploadDataResponse) {
            toast.success("Avatar uploaded!");
        } else {
            toast.error("Error uploading avatar image.");
        }

    };

    const submitChangePassword = async evt => {
        evt.preventDefault();
        if (passMatch()) {
            const passData = await changePassword({
                old_password: oldPassword,
                new_password: newPassword1
            }, authData.user.id, authData.token);

            if (passData) {
                toast.success("Password changed!");
            }
        } else {
            toast.error("Password does not match");
            console.log("Password does not match");
        }

    };

    return (
        <div>
            < Link to={'/'}>Main Page</Link>
            <h1>Change your picture</h1>
            <form onSubmit={uploadFile}>
                <label>
                    <p>Upload your avatar</p>
                </label>
                <TextField type={"file"} onChange={evt => setImage(evt.target.files[0])}/>
                <Button type={"submit"} variant={"contained"} color={"primary"}>Upload File</Button>

            </form>
            <h1>Change your password</h1>
            <form onSubmit={submitChangePassword}>
                <label>
                    <p>Type your old and new password below</p>
                </label>

                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                    <VpnKey sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <TextField id="old-password" label="Old Password" variant="standard" type={"password"}
                               autoComplete="on"
                               onChange={evt => setOldPassword(evt.target.value)}/>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                    <VpnKey sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <TextField id="new-password" label="New password" variant="standard" type={"password"}
                               autoComplete="on"
                               onChange={evt => setNewPassword1(evt.target.value)}/>
                </Box>

                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                    <VpnKey sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <TextField id="new-password-2" label="Repeat New Password" variant="standard" type={"password"}
                               autoComplete="on"
                               onChange={evt => setNewPassword2(evt.target.value)}/>
                </Box>
                <Button type={"submit"} variant={"contained"} color={"primary"}>Change password</Button>

            </form>
        </div>
    );
}

export default Account;
