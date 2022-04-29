import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    TextField
} from "@mui/material";
import User from "../../../../../@types/user";
import {FormEvent, useState} from "react";
import axios from "axios";

export interface UserUpdateProps {
    user: User;
    refresh: () => void
}


const UserUpdate = (props: UserUpdateProps) => {
    const {user, refresh} = props

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const [firstName, setFirstName] = useState<string>(user.firstName)
    const [lastName, setLastName] = useState<string>(user.lastName)
    const [email, setEmail] = useState<string>(user.email)
    const [role, setRole] = useState<string[]>(user.role)

    const handleRole = (item: string) => {
        setRole(role.includes(item) ? role.filter((e) => e !== item) : [...role, item])
    }

    const handleUpdate = async () => {
        await axios.put("http://localhost:3000/user/admin/" + user._id, {
            firstName, lastName, email, role
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
        }).then(({data}) => {
            console.log(data)
        }).catch((e) => {
            console.log(e)
        })
        refresh()
    }


    return (
        <Box>
            <Button
                sx={{
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                }}
                endIcon={<DriveFileRenameOutlineIcon/>}
                onClick={handleClickOpen}
            >
                update
            </Button>

            <Dialog
                fullWidth
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Update User : {user.firstName} {user.lastName}
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={(e) => handleSubmit(e)} autoComplete="off" noValidate>
                        <TextField id="standard-basic" label="First Name" variant="standard"
                                   margin={"normal"} fullWidth required value={firstName}
                                   onChange={(e) => setFirstName(e.target.value)}/>
                        <TextField id="standard-basic" label="Last Name" variant="standard" margin={"normal"} fullWidth
                                   required value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                        <TextField id="standard-basic" label="E-mail" variant="standard" margin={"normal"} fullWidth
                                   required value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <FormControl
                            required
                            error={role.length === 0}
                            component="fieldset"
                            sx={{m: 3}}
                            variant="standard"
                        >
                            <FormLabel component="legend"> Roles (Pick One)</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={role.includes('user')} onChange={() => handleRole('user')}
                                                  name="user"/>
                                    }
                                    label="user"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={role.includes('admin')} onChange={() => handleRole('admin')}
                                                  name="admin"/>
                                    }
                                    label="admin"
                                />

                            </FormGroup>
                            <FormHelperText>You can display an error</FormHelperText>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={() => {
                        handleUpdate();
                        handleClose();
                    }} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
};

export default UserUpdate;
