import {Alert, Box, Button} from "@mui/material";
import {useState} from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import User from "../../../../../@types/user";
import axios from "axios";
import {useNavigate} from "react-router-dom";

interface DeleteUserProps {
    user: User
}

const DeleteUser = (props: DeleteUserProps) => {
    const {user} = props;
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);

    const [password, setPassword] = useState<string>("")

    const [error, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        axios.delete("http://localhost:3000/user", {
            data: {password: password}, headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            }
        }).then(() => {
            handleClose();
            setError(false);
            navigate("/login");
        }).catch((e) => {
            setError(true)
            setErrorMessage(e.response.data.message)
        })

    }
    return <Box>
        <Button onClick={handleClickOpen} variant="outlined">Delete</Button>
        <Dialog fullWidth open={open} onClose={handleClose}>
            <DialogTitle>Delete {user.firstName} {user.lastName} </DialogTitle>
            <DialogContent>
                <DialogContentText component={Box}>
                    Write Correct password for delete !
                    {
                        error ? <Alert severity="error" onClose={() => {
                            setError(false)
                        }}>{errorMessage}!</Alert> : ""
                    }
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="password"
                    type="password"
                    fullWidth
                    variant="standard"
                    required
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => {
                    handleDelete();
                }}>Delete</Button>
            </DialogActions>
        </Dialog>
    </Box>
}

export default DeleteUser