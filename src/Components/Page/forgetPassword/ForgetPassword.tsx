import {Alert, Avatar, Box, Button, Grid, Snackbar, TextField, Typography, useMediaQuery,} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {FormEvent, useState} from "react";
import {deepPurple} from "@mui/material/colors";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import axios from "axios";
import {Send} from "@mui/icons-material";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
  bgImage: {
    backgroundImage: "url('/images/login.jpg')",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  login: {
    height: "100vh",
  },
  box: {
    width: "80%",
    left: "50%",
    top: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  },
  boxShadow: {
    boxShadow:
        "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
    width: "80%",
    left: "50%",
    top: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    padding: "30px",
  },
});

const ForgetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<boolean>(false);

  const [errorApi, setErrorApi] = useState<boolean>(false);

  const [errorApiMessage, setErrorApiMessage] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setErrorEmail(() => email === "");
    } else {
      setErrorEmail(false);
      axios
          .post("http://localhost:3000/auth/forget-password", {
            email: email,
          })
          .then(({data}) => {
            setOpen(true);
          })
          .catch((e) => {
            setErrorApi(true);
            setErrorApiMessage(e.response.data.message);
          });
    }
  };

  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const matches = useMediaQuery("(max-width:900px)");
  return (
      <Grid className={classes.login} container>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{width: "100%"}}>
            send email: {email} for change Password !
          </Alert>
        </Snackbar>
        <Grid className={classes.bgImage} item md={6} xs={0}/>
        <Grid sx={{position: "relative"}} item md={6} xs={12}>
          <Box className={matches ? classes.boxShadow : classes.box}>
            <Avatar sx={{bgcolor: deepPurple[500], m: " 10px auto"}}>
              <LockOpenIcon/>
            </Avatar>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              Login Account
            </Typography>
            {errorApi ? (
                <Alert
                    severity="error"
                    onClose={() => {
                      setErrorApi(false);
                    }}
                >
                  {errorApiMessage}
                </Alert>
            ) : (
                ""
            )}
            <form onSubmit={(e) => handleSubmit(e)} autoComplete="off" noValidate>
              <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errorEmail}
              />

              <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Link to={"/register"}>new Account ?</Link>
                <Link to={"/login"}>Sign in ?</Link>
              </Box>
              <Button
                  type={"submit"}
                  sx={{mt: 2}}
                  fullWidth
                  variant="contained"
                  endIcon={<Send/>}
              >
                Contained
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
  );
};

export default ForgetPassword;
