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
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {FormEvent, useState} from "react";
import {deepPurple} from "@mui/material/colors";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import axios from "axios";
import {Send, Visibility, VisibilityOff} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";

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

const Register = () => {
  const navigate = useNavigate();

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          .post("http://localhost:3000/auth/register", {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
          })
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
              <Box sx={{display: "flex", justifyContent: "end"}}>
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

export default Register;
