import Category from "../../../../../@types/Category";
import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import {useState} from "react";
import axios from "axios";

interface UpdateCategoryProps {
    handleRefresh: Function
    category: Category
}

const UpdateCategory = (props: UpdateCategoryProps) => {

    const {handleRefresh, category} = props;

    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [categoryName, setCategoryName] = useState<string>(category.name)

    const handleUpdate = () => {
        axios.put("http://localhost:3000/category/" + category._id, {
            name: categoryName
        }).then(() => {
            handleRefresh()
        }).catch((e) => {
            console.error(e.response.data.message)
        })
    }
    return <Box>
        <Button onClick={handleClickOpen} sx={{borderTopLeftRadius: 0, borderBottomLeftRadius: 1}}
                endIcon={<BrowserUpdatedIcon/>}>Update</Button>

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText>
                <TextField
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
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
                <Button onClick={() => {
                    handleClose()
                    handleUpdate()
                }
                }>Subscribe</Button>
            </DialogActions>
        </Dialog>

    </Box>
}

export default UpdateCategory