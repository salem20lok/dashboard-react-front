import {Alert, AlertTitle, Button, TextField} from "@mui/material";
import {Fragment, ReactNode, useState} from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle'
import axios from "axios";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import Typography from '@mui/material/Typography';

const steps = ['identification', 'New Password and confirmed', 'Update and finished'];

interface RestPasswordProps {
    setUser: Function
}

const ResetPassword = (props: any) => {
    const {setUser} = props
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set<number>());


    const isStepOptional = (step: number) => {
        return step === 1;
    };

    const isStepFailed = (step: number) => {
        if (activeStep === step && step === 0 && password === "") return true
        if (activeStep === step && step === 1 && (confirmedPassword === "" || newPassword === "")) return true
        return false
    };


    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
        setNewPassword("")
        setError(false)
        setPassword("")
        setConfirmedPassword("")
    };


    /*Stepper*/


    const [open, setOpen] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmedPassword, setConfirmedPassword] = useState<string>("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const stepsContents = [<Box>
        <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e) => {
                setPassword(e.target.value)
            }}
        />
    </Box>, <Box>
        <TextField
            autoFocus
            margin="dense"
            id="NewPassword"
            label="NewPassword"
            type="password"
            fullWidth
            variant="standard"
            value={newPassword}
            onChange={(e) => {
                setNewPassword(e.target.value)
            }}
        />
        <TextField
            autoFocus
            margin="dense"
            id="ConfirmedPassword"
            label="ConfirmedPassword"
            type="password"
            fullWidth
            variant="standard"
            value={confirmedPassword}
            onChange={(e) => {
                setConfirmedPassword(e.target.value)
            }}
        />
    </Box>, "step3"];


    const [error, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")

    const updatePassword = () => {
        axios.put("http://localhost:3000/user/update-password", {
            password: password,
            newPassword: newPassword,
            ConfirmedPassword: confirmedPassword
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
        }).then(({data}) => {
            setUser(data)
            setError(false)
        }).catch((e) => {
            setError(true)
            setErrorMessage(e.response.data.message)
        })
    }

    return <Box>
        <Button onClick={() => {
            handleClickOpen()
        }} variant="outlined">Reset Password</Button>
        <Dialog fullWidth open={open} onClose={handleClose}>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogContent>
                <Box sx={{width: '100%'}}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps: { completed?: boolean } = {};
                            const labelProps: {
                                optional?: ReactNode;
                                error?: boolean;
                            } = {};
                            if (isStepOptional(index)) {
                                labelProps.optional = (
                                    <Typography variant="caption">Optional</Typography>
                                );
                            }
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            if (isStepFailed(index)) {
                                labelProps.optional = (
                                    <Typography variant="caption" color="error">
                                        Not empty
                                    </Typography>
                                );
                                labelProps.error = true;
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <Fragment>
                            {
                                error ? <Alert severity="error">
                                    <AlertTitle>Error</AlertTitle>
                                    This is an error alert — <strong>{errorMessage}!</strong>
                                </Alert> : <Typography sx={{mt: 2, mb: 1}}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                            }

                            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                <Box sx={{flex: '1 1 auto'}}/>
                                <Button onClick={() => {
                                    handleClose();
                                    handleReset();
                                }}>finished</Button>
                            </Box>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Typography component={Box} sx={{mt: 2, mb: 1}}>{stepsContents[activeStep]}</Typography>
                            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{mr: 1}}
                                >
                                    Back
                                </Button>
                                <Box sx={{flex: '1 1 auto'}}/>
                                {isStepOptional(activeStep) && (
                                    <Button color="inherit" onClick={handleSkip} sx={{mr: 1}}>
                                        Skip
                                    </Button>
                                )}

                                {activeStep === steps.length - 1 ?
                                    <Button disabled={isStepFailed(activeStep)} onClick={() => {
                                        updatePassword()
                                        handleNext()
                                    }}>
                                        Change-Password
                                    </Button> : <Button disabled={isStepFailed(activeStep)} onClick={handleNext}>
                                        Next
                                    </Button>}
                            </Box>
                        </Fragment>
                    )}
                </Box>
            </DialogContent>
        </Dialog>

    </Box>
}

export default ResetPassword