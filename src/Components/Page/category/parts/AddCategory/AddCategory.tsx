import {Box, Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import axios from "axios";

interface AddCategoryProps {
    handleRefresh: Function
}

const AddCategory = (props: AddCategoryProps) => {

    const {handleRefresh} = props

    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [category, setCategory] = useState<string>("")

    const handleCategory = () => {
        axios.post("http://localhost:3000/category", {
            name: category
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            }
        }).then(({data}) => {
            setCategory("")
            handleRefresh()
        }).catch((e) => {
            console.error(e.response.data.message)
        })
    }

    return <Box>
        <Button onClick={(e) => {
            handleClickOpen()
        }} startIcon={<AddIcon/>} variant="outlined">Add Category</Button>
        <Dialog fullWidth open={open} onClose={handleClose}>
            <DialogTitle>Category</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To Add Category , Please Write Name Your Category
                </DialogContentText>
                <TextField
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name Category"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button disabled={category === ""} onClick={() => {
                    handleClose();
                    handleCategory();
                }}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    </Box>
}

export default AddCategory