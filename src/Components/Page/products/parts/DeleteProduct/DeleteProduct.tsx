import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import ProductsType from "../../../../../@types/ProductsType";
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";
import axios from "axios";

interface DeleteProductProps {
    product: ProductsType;
    HandleReset: Function;
}

const DeleteProduct = (props: DeleteProductProps) => {

    const {product, HandleReset} = props

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        axios.delete("http://localhost:3000/product/" + product._id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            }
        }).then(() => {
            HandleReset()
        }).catch((e) => {
            console.log(e.response.data.message)
        })
    }


    return <Box>
        <Button onClick={() => {
            handleClickOpen()
        }} sx={{borderTopRightRadius: "0", borderBottomRightRadius: "0"}} startIcon={<DeleteIcon/>}>Delete</Button>
        <Dialog
            fullWidth
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Delete Product ?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    are you ready for Delete this product {product.title}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => {
                    handleDelete()
                    handleClose()
                }} autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    </Box>

}

export default DeleteProduct