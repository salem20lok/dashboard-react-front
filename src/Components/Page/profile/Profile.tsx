import {Box, Button, Chip, Grid, Paper, Stack, Switch, TextField, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {styled} from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import {useEffect, useState} from "react";
import User from "../../../@types/user";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UploadImage from "./parts/UploadImage/UploadImage";
import FormControlLabel from '@mui/material/FormControlLabel';
import ResetPassword from "./parts/Reset-Password/ResetPassword";
import DeleteUser from "./parts/Delete/DeleteUser";


const useStyles = makeStyles({
    BoxPaper: {
        padding: "10px",
        marginBottom: "40px"
    },
    chip: {
        display: "flex",
        justifyContent: "space-around",
    },
    img: {
        width: "100px"
    },
    item: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        marginTop: "10px",
        marginBottom: "10px",
    },
    span: {
        marginRight: "10px",
        minWidth: "80px"
    }
})
const SmallAvatar = styled(Avatar)(({theme}) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
}));


const Profile = () => {
    const classes = useStyles()
    const navigate = useNavigate()

    const [user, setUser] = useState<User>({
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: [],
        avatar: "",
    });

    const [oldAvatar, setOldAvatar] = useState<string>("")

    const [openUpload, setOpenUploadUpload] = useState(false);

    const handleClickOpenUpload = () => {
        setOpenUploadUpload(true);
    };

    const handleCloseUpload = () => {
        setOpenUploadUpload(false);
    };


    useEffect(() => {
        axios.get("http://localhost:3000/user/identification", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
        }).then(({data}) => {
            setUser(data)
        }).catch(() => {
            navigate("/login");
        })
    }, [])


    const uploadImage = async (file: FileList | null) => {
        if (file === null) return;
        const formData = new FormData();
        formData.append("image", file[0]);
        await axios.post("http://localhost:3000/uploads", formData, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
        }).then(({data}) => {
            setOldAvatar(user.avatar)
            setUser({...user, avatar: data.url})
        }).catch((e) => {
            console.log(e.response.data.message)
        })
    }

    const handleRemoveUploadImage = () => {
        setUser({...user, avatar: oldAvatar})
    }

    const [update, setUpdate] = useState<boolean>(false)

    const handleUpdate = () => {
        axios.put("http://localhost:3000/user", user, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            }
        }).then(({data}) => {
            console.log(data)
            setUpdate(!update)
            setUser(data)
        }).catch((e) => {
            console.log(e)
            navigate("/login")
        })
    };


    return <Box>
        <Dialog
            open={openUpload}
            onClose={handleCloseUpload}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText component={Box}
                                   sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}
                                   id="alert-dialog-description">
                    <Avatar sx={{width: 100, height: 100}} alt="Travis Howard"
                            src={user.avatar}/>
                    <UploadImage uploadImage={uploadImage} user={user}
                    />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    handleCloseUpload();
                    handleRemoveUploadImage()
                }}>Remove</Button>
                <Button onClick={() => {
                    handleCloseUpload();
                    setUpdate(!update)
                    handleUpdate()
                }} autoFocus>
                    confirmed
                </Button>
            </DialogActions>
        </Dialog>

        <Grid container spacing={2}>
            <Grid item md={4} xs={12}>
                <Box className={classes.BoxPaper} component={Paper} elevation={12}>
                    <Box sx={{display: "flex", justifyContent: "space-around"}}>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            badgeContent={
                                <SmallAvatar onClick={handleClickOpenUpload}
                                             sx={{width: 50, height: 50, cursor: "pointer"}}
                                             alt="Remy Sharp"
                                > <AddPhotoAlternateIcon/> </SmallAvatar>
                            }
                        >
                            <Avatar sx={{width: 100, height: 100}} alt="Travis Howard"
                                    src={user.avatar}/>
                        </Badge>
                    </Box>
                    <Typography sx={{marginTop: "20px", marginBottom: "10px"}} variant="h5" component="h1"
                                align={"center"} noWrap
                    >
                        {user.firstName} {user.lastName}
                    </Typography>
                    <Box className={classes.chip}>
                        <Stack direction="row" spacing={1}>
                            {
                                user.role.map((el, idx) => {
                                    return (
                                        <Chip label={el} key={idx} color="success" variant="outlined"/>
                                    )
                                })
                            }
                        </Stack>

                    </Box>

                    <Box sx={{
                        marginTop: "20px",
                        marginBottom: "20px",
                        display: "flex",
                        justifyContent: "space-around"
                    }}>
                        <DeleteUser user={user}/>
                        <ResetPassword setUser={setUser}/>
                    </Box>

                </Box>
            </Grid>
            <Grid item md={8} xs={12}>
                <Box className={classes.BoxPaper} component={Paper} elevation={12}>
                    <FormControlLabel
                        sx={{
                            display: 'flex',
                            justifyContent: "flex-end"
                        }}
                        control={
                            <Switch
                                checked={update}
                                onChange={() => setUpdate(!update)}
                                name="loading"
                                color="primary"
                            />
                        }
                        label="Update"
                    />
                    <Grid sx={{p: 2}} container spacing={2}>
                        <Grid className={classes.item} item xs={12}>
                            <span className={classes.span}>FirstName:</span>
                            <TextField fullWidth label="firstName" variant="outlined"
                                       disabled={!update}
                                       value={user.firstName}
                                       onChange={(e) => setUser({...user, firstName: e.target.value})}/>
                        </Grid>
                        <Grid className={classes.item} item xs={12}>
                            <span className={classes.span}>LastName:</span>
                            <TextField fullWidth label="LastName" variant="outlined"
                                       disabled={!update}
                                       value={user.lastName}
                                       onChange={(e) => setUser({...user, lastName: e.target.value})}/>
                        </Grid>
                        <Grid className={classes.item} item xs={12}>
                            <span className={classes.span}>Email:</span>
                            <TextField fullWidth label="email" variant="outlined"
                                       disabled={!update}
                                       value={user.email}
                                       onChange={(e) => setUser({...user, email: e.target.value})}/>
                        </Grid>
                    </Grid>
                    {
                        update ? <Button fullWidth onClick={handleUpdate} variant="contained">Update</Button> : ""
                    }
                </Box>
            </Grid>
        </Grid>
    </Box>
}

export default Profile