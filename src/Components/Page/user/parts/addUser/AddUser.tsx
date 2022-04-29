import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import {FormEvent, useState} from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import axios from "axios";

interface addUserProps {
    refresh: () => void
}

const AddUser = (props: addUserProps) => {

    const {refresh} = props

    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [password, setPassword] = useState<string>("");
    const [errorPassword, setErrorPassword] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [email, setEmail] = useState<string>("");
    const [errorEmail, setErrorEmail] = useState<boolean>(false);

    const [firstName, setFirstName] = useState<string>("");
    const [errorFirstName, setErrorFirstName] = useState<boolean>(false);

    const [lastName, setLastName] = useState<string>("");
    const [errorLastName, setErrorLastName] = useState<boolean>(false);

    const [errorApi, setErrorApi] = useState<boolean>(false);
    const [errorApiMessage, setErrorApiMessage] = useState<string[]>([]);

    const handleAdd = () => {
        if (!email || !password) {
            setErrorEmail(() => email === "");
            setErrorPassword(() => password === "");
            setErrorLastName(() => lastName === "");
            setErrorFirstName(() => firstName === "");
        } else {
            setErrorEmail(false);
            setErrorPassword(false);
            setErrorLastName(false);
            setErrorFirstName(false);
            axios
                .post("http://localhost:3000/user", {
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                }, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("accessToken"),
                    }
                })
                .then(({data}) => {
                    refresh();
                    setEmail("");
                    setPassword("");
                    setLastName("");
                    setFirstName("");
                })
                .catch((e) => {
                    setErrorApi(true);
                    setErrorApiMessage(e.response.data.message);
                });
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (<Box>
        <Box sx={{m: 1, display: "flex", justifyContent: "flex-end"}}>
            <Button onClick={handleOpen} endIcon={<PersonAddAltIcon/>} variant="text">Add User</Button>
        </Box>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => handleSubmit(e)} autoComplete="off" noValidate>
                    <TextField
                        label="First Name"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        error={errorFirstName}
                    />

                    <TextField
                        label="Last Name"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        error={errorLastName}
                    />

                    <TextField
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={errorEmail}
                    />

                    <FormControl variant="outlined" margin="normal" fullWidth required>
                        <InputLabel htmlFor="outlined-adornment-password">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={errorPassword}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>

                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={() => {
                    handleClose();
                    handleAdd();
                }} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    </Box>)
}

export default AddUser