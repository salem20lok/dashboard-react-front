import {makeStyles} from "@mui/styles";
import {useLocation, useNavigate} from "react-router-dom";
import {FormEvent, useState} from "react";
import axios from "axios";
import {
  Alert,
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {deepPurple} from "@mui/material/colors";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {Send, Visibility, VisibilityOff} from "@mui/icons-material";

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

const ChangePassword = () => {
  const navigate = useNavigate();

  const token = useLocation().search.slice(7);

  const [password, setPassword] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [errorConfirmedPassword, setErrorConfirmedPassword] =
      useState<boolean>(false);
  const [showConfirmedPassword, setShowConfirmedPassword] =
      useState<boolean>(false);

  const [errorApi, setErrorApi] = useState<boolean>(false);
  const [errorApiMessage, setErrorApiMessage] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!confirmedPassword || !password) {
      setErrorConfirmedPassword(() => confirmedPassword === "");
      setErrorPassword(() => password === "");
    } else {
      setErrorConfirmedPassword(false);
      setErrorPassword(false);
      axios
          .post(
              "http://localhost:3000/auth/change-password",
              {
                confirmedPassword: confirmedPassword,
                password: password,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
          )
          .then(({data}) => {
            navigate("/login");
          })
          .catch((e) => {
            setErrorApi(true);
            setErrorApiMessage(e.response.data.message);
          });
    }
  };

  const classes = useStyles();
  const matches = useMediaQuery("(max-width:900px)");
  return (
      <Grid className={classes.login} container>
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

            <form onSubmit={(e) => handleSubmit(e)} autoComplete="off" noValidate>
              <FormControl variant="outlined" margin="normal" fullWidth required>
                <InputLabel htmlFor="outlined-adornment-confirmed-password">
                  ConfirmedPassword
                </InputLabel>
                <OutlinedInput
                    id="outlined-adornment-confirmed-password"
                    type={showConfirmedPassword ? "text" : "password"}
                    value={confirmedPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                    error={errorConfirmedPassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                                setShowConfirmedPassword(!showConfirmedPassword)
                            }
                            edge="end"
                        >
                          {showConfirmedPassword ? (
                              <VisibilityOff/>
                          ) : (
                              <Visibility/>
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirmed Password"
                />
              </FormControl>

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

export default ChangePassword;
