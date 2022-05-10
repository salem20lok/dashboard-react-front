import {Box, Button} from "@mui/material";
import ProductsType from "../../../../../@types/ProductsType";
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import {FormEvent, useState} from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'

interface UpdateProductProps {
    product: ProductsType;
    HandleReset: Function
}

const UpdateProduct = (props: UpdateProductProps) => {

    const {product, HandleReset} = props

    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return <Box> <Button onClick={handleClickOpen} sx={{borderTopLeftRadius: "0", borderBottomLeftRadius: "0"}}
                         startIcon={<SystemUpdateAltIcon/>}>Update</Button>

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText>

                <form autoComplete="off" onSubmit={(e) => {
                    handleSubmit(e)
                }} noValidate>

                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    </Box>
}

export default UpdateProduct