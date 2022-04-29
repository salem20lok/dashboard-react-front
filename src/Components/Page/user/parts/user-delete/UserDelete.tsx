import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import User from "../../../../../@types/user";
import {useState} from "react";
import {useTheme} from "@mui/material/styles";
import axios from "axios";

export interface UserDeleteProps {
    user: User;
    refresh: () => void
}

export const UserDelete = (props: UserDeleteProps) => {
    const {user, refresh} = props;
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async (id: string) => {
        await axios
            .delete("http://localhost:3000/user/" + id, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then(() => {
            })
            .catch((e) => {
                console.log(e);
            });
        refresh()
    };

    return (
        <Box>
            <Button
                sx={{
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                }}
                onClick={handleClickOpen}
                endIcon={<DeleteIcon/>}
            >
                delete
            </Button>
            <Dialog
                fullWidth
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Delete User {user.email}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are You Serious about deleting users : {user.firstName}{" "}
                        {user.lastName}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color={"success"} autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        color={"warning"}
                        onClick={() => {
                            handleClose();
                            handleDelete(user._id);
                        }}
                        autoFocus
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserDelete;
