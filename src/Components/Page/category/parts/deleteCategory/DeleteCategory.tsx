import {Box} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Category from "../../../../../@types/Category";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import axios from "axios";

interface DeleteCategoryProps {
    handleRefresh: Function
    category: Category
}

const DeleteCategory = (props: DeleteCategoryProps) => {

    const {handleRefresh, category} = props

    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = () => {

        axios.delete("http://localhost:3000/category/" + category._id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            }
        }).then(() => {
            handleRefresh()
        }).catch((e) => {
            console.error(e.response.data.message)
        })
    }

    return <Box>
        <Button sx={{borderTopRightRadius: 0, borderBottomRightRadius: 1}} onClick={handleClickOpen}
                startIcon={<DeleteIcon/>}>Delete</Button>
        <Dialog fullWidth open={open} onClose={handleClose}>
            <DialogTitle>Category</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Delete Category {category.name} ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={
                    () => {
                        handleDelete();
                        handleClose()
                    }}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    </Box>
}

export default DeleteCategory